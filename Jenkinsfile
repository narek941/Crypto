pipeline {
  agent {
      any {
      }
  }
  parameters {
    gitParameter branchFilter: 'origin/(.*)', defaultValue: 'develop', name: 'BRANCH', type: 'PT_BRANCH_'
  }
  environment {
      ECR_REPO = "549561453186.dkr.ecr.eu-west-1.amazonaws.com/terocoso/service/frontend-teroxx-${env.ENV}"
      AWS_DEFAULT_REGION = "eu-west-1"
      ENV = "${env.ENV}"
  }
  stages {
    stage("Docker Build") {
      steps {
        script {
         commit_hash = sh(script: 'git rev-parse --short=6 HEAD', returnStdout: true).trim()
        }
       container('docker') {
         sh "docker build --network=host -t ${ECR_REPO}:${commit_hash} --build-arg ENV=$ENV ."
       }
    }
    }
    stage("ECR push") {
      steps {
        container('docker') {
              script {
                def login = ecrLogin()
                sh "${login}"
                sh "docker push ${ECR_REPO}:${commit_hash}"
              }
          }
        }
      }
    stage("Clone k8s repo") {
      steps{
        dir('k8s') {}
        git branch: 'master',
            credentialsId: 'teroxx-deploy',
            url: 'git@git.testserver.kiev.ua:teroxx-controlling-software/k8s-manifests.git'
      }
    }
    stage("Kustomize") {
      steps {
        container('kustomize') {
        dir('k8s') {}
        sh "cd frontend-teroxx/kustomize/overlays/$ENV && /app/kustomize edit set image service/frontend-teroxx=${ECR_REPO}:${commit_hash}"
        }
      }
    }
    stage("Push") {
        environment {
          HASH = "$commit_hash"
        }
        steps {
          dir('k8s') {}
          sh('''
              git config user.name 'jenkins'
              git config user.email 'som@unicsoft.com'
              git add frontend-teroxx/kustomize/overlays/$ENV/kustomization.yaml
              git commit -m "[frontend-teroxx][$ENV] Deploy revision \$HASH"
          ''')

          sshagent(['teroxx-deploy']) {
              sh("""
                  #!/usr/bin/env bash
                  set +x
                  export GIT_SSH_COMMAND="ssh -oStrictHostKeyChecking=no"
                  git push origin master
               """)
          }
        }
      }
}
}
