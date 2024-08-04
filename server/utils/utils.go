package utils

import (
	"os"

	"fmt"
	"sync"

	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"

	"k8s.io/client-go/kubernetes"
)

func getKubernetesConfig() (*rest.Config, error) {
	if os.Getenv("KUBERNETES_SERVICE_HOST") != "" {
		return rest.InClusterConfig()
	}
	kubeconfig := os.Getenv("KUBECONFIG")

	return clientcmd.BuildConfigFromFlags("", kubeconfig)
}

// Struct to manage K8s config
type KubernetesClient struct {
	clientset *kubernetes.Clientset
}

var kubeClient *KubernetesClient
var once sync.Once

// create new K8s client
func initKubernetesClient() error {
	config, err := getKubernetesConfig()
	if err != nil {
		return fmt.Errorf("error defining configuration: %v", err)
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		return fmt.Errorf("error creating clientset: %v", err)
	}

	kubeClient = &KubernetesClient{clientset: clientset}
	return nil
}

// retrieve the clientset
func GetKubernetesClient() (*KubernetesClient, error) {
	var err error
	once.Do(func() {
		err = initKubernetesClient()
	})
	return kubeClient, err
}
