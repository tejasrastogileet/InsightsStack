from rest_framework import serializers
from .models import Dashboard, Widget

class WidgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Widget
        fields = '__all__'

class DashboardSerializer(serializers.ModelSerializer):
    widgets = WidgetSerializer(many=True, read_only=True)
    
    class Meta:
        model = Dashboard
        fields = '__all__'
