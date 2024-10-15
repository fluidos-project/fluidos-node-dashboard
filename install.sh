!#/bin/bash

# the script fails if the first argument is "kind" and the second is not provider
if [ "$1" == "kind" ] && [ "$2" == "" ]; then
    echo "Please provide the kind cluster name"
    exit 1
fi

# build the docker image of backend component
docker build -t dashboard-backend $PWD/server
# build the docker imagee of frontend component
docker build -t dashboard-frontend $PWD/client


# if first argument is "kind" check if the second argument is an existing kind cluster
if [ "$1" == "kind" ]; then
    if [ "$(kind get clusters | grep $2)" == "$2" ]; then
        echo "Cluster $2 exists"
        # load the docker images into the kind cluster
        kind load docker-image dashboard-backend --name $2
        kind load docker-image dashboard-frontend --name $2
        # apply the k8s manifests
        kubectl apply -f $PWD/manifests
    else
        echo "Cluster $2 does not exist"
        exit 1
    fi
else if [ "$1" == "k3s" ||  "$1" == "kubeadm" ]; then
    # save the docker images as tar files
    docker save dashboard-frontend -o $PWD/dashboard-frontend.tar
    docker save dashboard-backend -o $PWD/dashboard-backend.tar
    # copy the tar files to the k3s node
    if [ "$1" == "k3s" ]; then
        k3s ctr images import $PWD/dashboard-frontend.tar
        k3s ctr images import $PWD/dashboard-backend.tar
    else
        ctr -n k8s.io images import $PWD/dashboard-frontend.tar
        ctr -n k8s.io images import $PWD/dashboard-backend.tar
    fi
    # apply the k8s manifests
    kubectl apply -f $PWD/manifests
    # delete the tar files
    rm $PWD/dashboard-frontend.tar
    rm $PWD/dashboard-backend.tar
    fi
    # delete the docker images
    # docker rmi dashboard-frontend
    # docker rmi dashboard-backend
fi
