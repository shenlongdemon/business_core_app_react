
# Description

    This is business core for app and it used dependency injection. So that, if who uses and implements some businesses out side of it, please install packages what supports dependency injection

# Configuration

## Dependency Injection

    Please install follow packages

    ```
    "inversify": "5.0.1",
    "reflect-metadata": "0.1.12"
    ```

## Infrastructure

### ioc

    Binding implementations classes to interfaces

### factoryinjection

    Factory support to call real implementation class via interface

### identifier

    Declare list of identifier name for each service

## Services

    ```
    ./lib/services
    ```

    These are some service interfaces that are exported, `mobile app` and web app will call them to do business.