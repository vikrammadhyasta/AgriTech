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

  post {
    failure {
      withCredentials([string(credentialsId: 'AgriTech-Gpt-key', variable: 'OPENAI_API_KEY')]) {
        sh '''
        echo "=============================="
        echo "AI FAILURE ANALYZER STARTED"
        echo "=============================="

        curl http://localhost:9090/job/${JOB_NAME}/${BUILD_NUMBER}/consoleText > /tmp/jenkins.log

        OPENAI_API_KEY=$OPENAI_API_KEY python3 /home/ubuntu/jenkins-ai/analyze_logs.py /tmp/jenkins.log

        echo "=============================="
        echo "AI FAILURE ANALYSIS COMPLETE"
        echo "=============================="
        '''
      }
    }
  }
}
