pipeline {
  agent any

  environment {
    AWS_REGION = "ap-south-1"
    ECR_URI = "270368607340.dkr.ecr.ap-south-1.amazonaws.com/agritech-frontend"
    IMAGE_TAG = "${BUILD_NUMBER}"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Image') {
      steps {
        sh '''
          docker build -t agritech-frontend:${IMAGE_TAG} .
        '''
      }
    }

    stage('Login to ECR') {
      steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'AgriTech-Aws']]) {
          sh '''
            aws ecr get-login-password --region $AWS_REGION \
            | docker login --username AWS --password-stdin $ECR_URI
          '''
        }
      }
    }

    stage('Push Image') {
      steps {
        sh '''
          docker tag agritech-frontend:${IMAGE_TAG} $ECR_URI:${IMAGE_TAG}
          docker tag agritech-frontend:${IMAGE_TAG} $ECR_URI:latest
          docker push $ECR_URI:${IMAGE_TAG}
          docker push $ECR_URI:latest
        '''
      }
    }
  }
}
