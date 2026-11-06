import pandas as pd
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Dataset, ImportHistory
from .serializers import DatasetSerializer, ImportHistorySerializer

class DatasetViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DatasetSerializer
    parser_classes = (MultiPartParser, FormParser)
    
    def get_queryset(self):
        workspace_id = self.request.query_params.get('workspace')
        if workspace_id:
            return Dataset.objects.filter(workspace_id=workspace_id, workspace__members__user=self.request.user)
        return Dataset.objects.filter(workspace__members__user=self.request.user)
        
    def perform_create(self, serializer):
        dataset = serializer.save(created_by=self.request.user)
        if dataset.file:
            try:
                # Mock parsing logic with pandas
                df = None
                if dataset.file.name.endswith('.csv'):
                    df = pd.read_csv(dataset.file)
                elif dataset.file.name.endswith('.xlsx'):
                    df = pd.read_excel(dataset.file)
                
                if df is not None:
                    dataset.row_count = len(df)
                    dataset.columns = [{"name": col, "type": str(df[col].dtype)} for col in df.columns]
                    dataset.preview = df.head(10).to_dict('records')
                    dataset.status = 'ready'
                else:
                    dataset.status = 'error'
                    dataset.error_message = 'Unsupported file format'
            except Exception as e:
                dataset.status = 'error'
                dataset.error_message = str(e)
            dataset.save()
            
            ImportHistory.objects.create(
                dataset=dataset,
                imported_by=self.request.user,
                rows_imported=dataset.row_count,
                status='success' if dataset.status == 'ready' else 'failed'
            )
