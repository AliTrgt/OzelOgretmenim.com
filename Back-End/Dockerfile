# Base image olarak OpenJDK 17 JDK slim kullanıyoruz
FROM openjdk:17-jdk-slim

# Çalışma dizinini /app olarak ayarlıyoruz
WORKDIR /app

# Hedef klasörden jar dosyasını /app klasörüne kopyalıyoruz
COPY target/SoftwareEngineeringProject-0.0.1-SNAPSHOT.jar /app/

# Sağlık kontrolü ekliyoruz
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Jar dosyasını çalıştırmak için komutu belirtiyoruz
CMD ["java", "-jar", "/app/SoftwareEngineeringProject-0.0.1-SNAPSHOT.jar"]