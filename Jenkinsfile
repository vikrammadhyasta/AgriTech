pipeline {
    agent any

    environment {
        IMAGE_NAME = "agritech-frontend"
        CONTAINER_NAME = "agritech-ui"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Cloning code from GitHub"
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies"
                sh 'npm install'
            }
        }

        stage('Build App') {
            steps {
                echo "Building frontend app"
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image"
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Stop Old Container') {
            steps {
                echo "Stopping old container if exists"
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                echo "Running new container"
                sh '''
                docker run -d -p 8080:4173 --name $CONTAINER_NAME $IMAGE_NAME:latest
                '''
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD Pipeline completed successfully"
        }
        failure {
            echo "❌ Pipeline failed"
        }
    }
}
