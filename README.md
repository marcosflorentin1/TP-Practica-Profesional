# IngresoVehiculo

Objetivo:
Desarrollar un sistema de altas bajas y modificaciones web para llevar a cabo la
trazabilidad y registro y control de trámites de baja de vehículos y sus respectivas partes.
Alcance:
El sistema, deberá dar soporte a 3 funciones de ABM:
1. Registro de usuarios.
2. Registro de Vehículos con su estado actual de trámite y las partes asociadas al
mismo.
3. Registro de Partes que podrán ser asociadas a un vehículo.
Registro de Usuarios:
El sistema poseerá un acceso con permisos de administrador comprendido por un
usuario y contraseña que deberán ser brindados en el acceso inicial al sistema. Una vez
identificado en el sistema, el rol de administrador podrá realizar acciones de ABM de las
secciones de usuarios, vehículos y partes. Los roles existentes serán: Administrador y Empleado.
Registro de Vehículos y Partes:
Una vez identificado el usuario con un rol de empleado, se presentará al mismo la página
principal (home) mostrando la lista de vehículos, también tendrá acceso a la lista de partes con
acciones de ABM para ambas secciones. La edición de registros, tanto de vehículos como de
partes, se realizará en la misma página de creación de un nuevo registro. Al crear un nuevo
vehículo también se podrá indicar las partes a asociar.
Limites:
El desarrollo del sistema incluye, desde el análisis de requerimientos, desarrollo de una
versión Alpha para demo y retroalimentación y entregable final, hasta la instalación de la Web
Api y el Frontend en el hosting Linux que el cliente posee actualmente.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
