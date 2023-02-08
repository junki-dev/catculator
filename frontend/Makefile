dbuild:
	docker build --build-arg ENV=local -t catculator-web:latest .

drun:
	docker run -d -it --name catculator-web --network host -p 3000:3000 catculator-web:latest

drm:
	docker rm -f catculator-web