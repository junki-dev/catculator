dbuild:
	docker build --build-arg ENV=local -t catculator-server:latest .

drun:
	docker run -d -it --network host --name catculator-server -p 8080:8080 catculator-server:latest

drm:
	docker rm -f catculator-server