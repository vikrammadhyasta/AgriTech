pipeline {
  agent any

  environment {
    AWS_REGION = "ap-south-1"
    ECR_URI = "270368607340.dkr.ecr.ap-south-1.amazonaws.com/agritech-frontend"
    IMAGE_TAG = "${BUILD_NUMBER}"
  }

  stages {

    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
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
            | docker login --username AWS --password-stdin 270368607340.dkr.ecr.ap-south-1.amazonaws.com
          '''
        }
      }
    }

    stage('Push Image to ECR') {
      steps {
        sh '''
          docker tag agritech-frontend:${IMAGE_TAG} $ECR_URI:${IMAGE_TAG}
          docker push $ECR_URI:${IMAGE_TAG}
        '''
      }
    }
  }
}
