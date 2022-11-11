from django.urls import include, path
from .views import ClientsCreate, ClientsList, ClientsDetail, ClientsUpdate, ClientsDelete
from .views import WorkersCreate, WorkersList, WorkersDetail, WorkersUpdate, WorkersDelete
from .views import CredentialsCreate, CredentialsList, CredentialsDetail, CredentialsUpdate, CredentialsDelete


urlpatterns = [
    #clients table urls
    path('clients/create/', ClientsCreate.as_view(), name='create-clients'),
    path('clients/', ClientsList.as_view()),
    path('clients/<int:pk>/', ClientsDetail.as_view(), name='retrieve-clients'),
    path('clients/update/<int:pk>/', ClientsUpdate.as_view(), name='update-clients'),
    path('clients/delete/<int:pk>/', ClientsDelete.as_view(), name='delete-clients'),
    #credentials table urls
    path('credentials/create/', CredentialsCreate.as_view(), name='create-credentials'),
    path('credentials/', CredentialsList.as_view()),
    path('credentials/<int:pk>/', CredentialsDetail.as_view(), name='retrieve-credentials'),
    path('credentials/update/<int:pk>/', CredentialsUpdate.as_view(), name='update-credentials'),
    path('credentials/delete/<int:pk>/', CredentialsDelete.as_view(), name='delete-credentials'),
    #workers table urls
    path('workers/create/', WorkersCreate.as_view(), name='create-workers'),
    path('workers/', WorkersList.as_view()),
    path('workers/<int:pk>/', WorkersDetail.as_view(), name='retrieve-workers'),
    path('workers/update/<int:pk>/', WorkersUpdate.as_view(), name='update-workers'),
    path('workers/delete/<int:pk>/', WorkersDelete.as_view(), name='delete-workers'),
]