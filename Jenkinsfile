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
            | docker login --username AWS --password-stdin $ECR_URI
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

    stage('Update Kubernetes Manifest') {
      steps {
        sh '''
          sed -i "s|IMAGE_TAG_PLACEHOLDER|$ECR_URI:$IMAGE_TAG|g" k8s/deployment.yaml
        '''
      }
    }

    stage('Commit & Push Changes') {
      steps {
        sh '''
         git fetch origin main
         git checkout -B main origin/main

         git remote set-url origin git@github.com:vikrammadhyasta/AgriTech.git

         git config user.email "jenkins@ci.com"
         git config user.name "Jenkins CI"

         git add k8s/deployment.yaml
         git commit -m "Update image tag to ${IMAGE_TAG}" || echo "Nothing to commit"

         git push origin main
        '''
      }
    }
  }
}
