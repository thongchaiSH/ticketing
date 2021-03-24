## Install
```
brew install --cask google-cloud-sdk
brew info google-cloud-sdk
source "$(brew --prefix)/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/path.zsh.inc"


gcloud auth login or gcloud auth application-default login
gcloud init
//settup
gcloud container clusters get-credentials ticketing

<!-- Install nginx -->
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml
```

## Create a Scret
```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
kubectl get secret
```

## Run
```
skaffold dev
```

## Note
If chrome warning about ssl typeing 'thisisunsafe'

## Kubectl
```
kubectl get services -n ingress-nginx

<!-- Forward port -->
kubectl port-forward nats-depl-5c9c48fc55-4ww76 4222:4222
kubectl port-forward nats-depl-5c9c48fc55-4ww76 8222:8222
```

## NATS
```
http://localhost:8222/streaming
```

## Npm Registry
```
npm adduser
npm publish --access public

<!-- Update version -->
npm version patch

<!-- Publish -->
npm version patch
npm run build
npm publish
```