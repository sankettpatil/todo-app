from django.urls import path
from .views import list_todos, add_todo, update_todo, delete_todo, register_user

urlpatterns = [
    path('register/', register_user),
    path('todos/', list_todos),
    path('todos/add/', add_todo),  
    path('todos/<int:pk>/', update_todo),
    path('todos/<int:pk>/delete/', delete_todo),  

]