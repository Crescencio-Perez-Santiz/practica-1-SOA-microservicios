import pika
import json
from Application.UseCase import UpdateInventoryUseCase
from Infrastructure.Repositories.Repository import InventoryRepository

rabbitmq_settings = {
    'host': 'localhost',
    'port': 5672,
    'credentials': pika.PlainCredentials('crescens', 'adminadmin')
}

print("Conectando a RabbitMQ...")
connection = pika.BlockingConnection(pika.ConnectionParameters(**rabbitmq_settings))
channel = connection.channel()
print("Conectado a RabbitMQ.")

print("Asegurando que la cola 'OrderShipped' existe...")
channel.queue_declare(queue='OrderShipped', durable=True)
print("Cola 'OrderShipped' asegurada.")

inventory_repository = InventoryRepository()

def callback(ch, method, properties, body):
    print("Mensaje recibido. Procesando...")
    order = json.loads(body)
    use_case = UpdateInventoryUseCase(inventory_repository)
    use_case.execute(order)
    print("Mensaje procesado.")

print("Iniciando consumidor...")
channel.basic_consume(queue='OrderShipped', on_message_callback=callback, auto_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()