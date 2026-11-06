from rest_framework import viewsets, permissions
from .models import Dashboard, Widget
from .serializers import DashboardSerializer, WidgetSerializer

class DashboardViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DashboardSerializer
    
    def get_queryset(self):
        workspace_id = self.request.query_params.get('workspace')
        if workspace_id:
            return Dashboard.objects.filter(workspace_id=workspace_id, workspace__members__user=self.request.user)
        return Dashboard.objects.filter(workspace__members__user=self.request.user)

class WidgetViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WidgetSerializer
    
    def get_queryset(self):
        return Widget.objects.filter(dashboard__workspace__members__user=self.request.user)
