from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SubscriptionPlan, Subscription
from .serializers import SubscriptionPlanSerializer, SubscriptionSerializer

class SubscriptionPlanListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = SubscriptionPlan.objects.filter(is_active=True)
    serializer_class = SubscriptionPlanSerializer

class CurrentSubscriptionView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        # In a real app, user selects their organization.
        # Here we just get the first organization the user owns.
        org = request.user.owned_organizations.first()
        if not org or not hasattr(org, 'subscription'):
            return Response({'error': 'No active subscription found'}, status=404)
        
        serializer = SubscriptionSerializer(org.subscription)
        return Response(serializer.data)

class UpgradeSubscriptionView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        plan_id = request.data.get('plan_id')
        org = request.user.owned_organizations.first()
        if not org or not hasattr(org, 'subscription'):
            return Response({'error': 'Organization/Subscription not found'}, status=404)
            
        try:
            plan = SubscriptionPlan.objects.get(id=plan_id, is_active=True)
        except SubscriptionPlan.DoesNotExist:
            return Response({'error': 'Invalid plan'}, status=400)
            
        org.subscription.plan = plan
        org.subscription.status = 'active'
        org.subscription.save()
        return Response({'status': 'upgraded', 'new_plan': plan.name})
