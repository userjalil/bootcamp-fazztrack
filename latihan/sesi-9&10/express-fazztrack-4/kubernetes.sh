echo " Membuat secret"
echo "================"
sleep 3s
kubectl create -f kubernetes/secret.yaml

echo " Membuat configmap"
echo "=================="
sleep 3s
kubectl create -f kubernetes/configmap.yaml

echo "\n"
echo " Deploy redis"
echo "=============="
sleep 3s
kubectl create -f kubernetes/deploy-redis.yaml

echo "\n"
echo " Deploy PostgreSQL"
echo "==================="
sleep 3s
kubectl create -f kubernetes/statefulset-postgres.yaml

echo "\n"
echo " Deploy express-fazztrack-4"
echo "============================"
sleep 3s
kubectl create -f kubernetes/deploy-express.yaml

echo "\n"
echo " Menampilkan hasil deploy"
echo "=========================="
sleep 10s
kubectl get all

echo "\n"
echo " Status aplikasi express-fazztrack-4"
echo "====================================="
sleep 15s
kubectl logs -l app=express-4

echo "\n"
echo " Melakukan ekspos Service dengan minikube"
echo "=========================================="
sleep 5s
minikube service express4-service