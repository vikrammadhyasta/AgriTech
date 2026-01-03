pipeline {
  agent any

  environment {
    AWS_REGION = "ap-south-1"
    ECR_URI    = "270368607340.dkr.ecr.ap-south-1.amazonaws.com/agritech-frontend"
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
          docker build -t agritech-frontend:latest .
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

    stage('Push Image to ECR') {
      steps {
        sh '''
          docker tag agritech-frontend:latest $ECR_URI:latest
          docker push $ECR_URI:latest
        '''
      }
    }
  }

  post {
    success {
      echo "✅ Image pushed to ECR successfully. ArgoCD will deploy automatically."
    }
  }
}
