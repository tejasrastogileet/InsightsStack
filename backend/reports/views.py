import uuid
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from .models import Report, ScheduledReport
from .serializers import ReportSerializer, ScheduledReportSerializer

class ReportViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReportSerializer
    
    def get_queryset(self):
        workspace_id = self.request.query_params.get('workspace')
        if workspace_id:
            return Report.objects.filter(workspace_id=workspace_id, workspace__members__user=self.request.user)
        return Report.objects.filter(workspace__members__user=self.request.user)
        
    @action(detail=True, methods=['post'])
    def share(self, request, pk=None):
        report = self.get_object()
        if not report.share_token:
            report.share_token = uuid.uuid4().hex
            report.is_public = True
            report.save()
        return Response({'share_token': report.share_token})
        
    @action(detail=True, methods=['get'])
    def export(self, request, pk=None):
        report = self.get_object()
        format = request.query_params.get('format', 'pdf')
        
        if format == 'pdf':
            response = HttpResponse(content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{report.name}.pdf"'
            # Mock PDF generation
            response.write(b'%PDF-1.4 mock pdf content')
            return response
        elif format == 'csv':
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = f'attachment; filename="{report.name}.csv"'
            response.write("mock,csv,content\n1,2,3")
            return response
            
        return Response({'error': 'Invalid format'}, status=400)

class ScheduledReportViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ScheduledReportSerializer
    
    def get_queryset(self):
        return ScheduledReport.objects.filter(report__workspace__members__user=self.request.user)
