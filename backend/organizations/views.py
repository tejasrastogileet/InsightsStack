from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Organization, OrganizationMember
from .serializers import OrganizationSerializer, OrganizationMemberSerializer

class OrganizationViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrganizationSerializer
    
    def get_queryset(self):
        return Organization.objects.filter(members__user=self.request.user)
        
    def perform_create(self, serializer):
        org = serializer.save(owner=self.request.user)
        OrganizationMember.objects.create(organization=org, user=self.request.user, role='admin')

class OrganizationMemberViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrganizationMemberSerializer
    
    def get_queryset(self):
        return OrganizationMember.objects.filter(organization_id=self.kwargs.get('organization_pk'))
