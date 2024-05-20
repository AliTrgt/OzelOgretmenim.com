package com.example.SoftwareEngineeringProject.config;

import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class StartUpConfig implements CommandLineRunner {

    private final SocketIOServer socketIOServer;

    public StartUpConfig(SocketIOServer socketIOServer) {
        this.socketIOServer = socketIOServer;
    }



    @Override
    public void run(String... args) throws Exception {
                socketIOServer.start();
    }
}
