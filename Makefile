db:
	docker build -t db-a ./db-a
	docker build -t db-b ./db-b

images: db
	docker build -t service-a ./service-a

.PHONY : db images
