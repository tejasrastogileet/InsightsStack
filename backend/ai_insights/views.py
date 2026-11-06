from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import AIConversation, AIMessage
from .serializers import AIConversationSerializer
from .gemini_client import get_ai_response, get_kpi_insights

class AIConversationViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AIConversationSerializer
    
    def get_queryset(self):
        return AIConversation.objects.filter(user=self.request.user)

class AIQueryView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        question = request.data.get('question')
        conversation_id = request.data.get('conversation_id')
        workspace_id = request.data.get('workspace_id')
        
        if not question or not workspace_id:
            return Response({'error': 'question and workspace_id are required'}, status=status.HTTP_400_BAD_REQUEST)
            
        if conversation_id:
            try:
                conv = AIConversation.objects.get(id=conversation_id, user=request.user)
            except AIConversation.DoesNotExist:
                return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            conv = AIConversation.objects.create(
                user=request.user,
                workspace_id=workspace_id,
                title=question[:50]
            )
            
        AIMessage.objects.create(conversation=conv, role='user', content=question)
        
        try:
            response_text = get_ai_response(question, "Workspace context")
            AIMessage.objects.create(conversation=conv, role='assistant', content=response_text)
            return Response({'response': response_text, 'conversation_id': conv.id})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AIInsightsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        workspace_id = request.query_params.get('workspace_id')
        # Mock KPI data fetch
        mock_kpi = {"revenue": 5000, "growth": "10%"}
        try:
            insights = get_kpi_insights(mock_kpi)
            return Response({'insights': insights})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
