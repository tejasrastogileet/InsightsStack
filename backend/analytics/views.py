from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from datetime import timedelta
import random
from .models import KPI, AnalyticsSnapshot
from .serializers import KPISerializer

class KPIViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = KPISerializer
    
    def get_queryset(self):
        workspace_id = self.request.query_params.get('workspace')
        if workspace_id:
            return KPI.objects.filter(workspace_id=workspace_id, workspace__members__user=self.request.user)
        return KPI.objects.filter(workspace__members__user=self.request.user)

class RevenueView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        # Mock time-series revenue data
        data = [
            {"date": (timezone.now() - timedelta(days=i)).strftime('%Y-%m-%d'), "revenue": random.randint(1000, 5000)}
            for i in range(30, 0, -1)
        ]
        return Response(data)

class CustomerGrowthView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        data = [
            {"date": (timezone.now() - timedelta(days=i)).strftime('%Y-%m-%d'), "customers": random.randint(10, 50)}
            for i in range(30, 0, -1)
        ]
        return Response(data)

class TrendAnalysisView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        return Response({"trend": "up", "percentage": 15.5})

class ConversionRateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        return Response({"conversion_rate": 3.2})
