pipeline {
  agent {
    node {
      label 'yarn run dev'
    }
    
  }
  stages {
    stage('build') {
      steps {
        sh './build -p'
      }
    }
  }
}