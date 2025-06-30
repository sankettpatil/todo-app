from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User



# registration view

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username=request.data.get('username')
    password=request.data.get('password')
    if not username or not password:
        return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=username, password=password)
    user.save()
    return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def list_todos(request):
    todos = Todo.objects.filter(user=request.user)
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_todo(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def update_todo(request,pk):
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response({"error": "Todo not found"}, status=404)
    if 'completed' in request.data:
        todo.completed = request.data['completed']
        todo.save()
        serializer = TodoSerializer(todo)
        return Response(serializer.data, status=200)
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_todo(request, pk):
    try:
        todo = Todo.objects.get(pk=pk)
        todo.delete()
        return Response({"message": "Todo deleted"}, status=204)
    except Todo.DoesNotExist:
        return Response({"error": "Todo not found"}, status=404)
