FROM php:8.1-apache AS backend

# Instalar herramientas y dependencias necesarias
RUN apt-get update && apt-get install -y \
    nano \
    curl \
    g++ \
    git \
    libbz2-dev \
    libfreetype6-dev \
    libicu-dev \
    libjpeg-dev \
    libmcrypt-dev \
    libpng-dev \
    libreadline-dev \
    sudo \
    unzip \
    zip \
    libonig-dev \
    libzip-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar el código fuente de la aplicación
WORKDIR /var/www/html
COPY ./backend .

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Habilitar mod_rewrite y mod_headers
RUN a2enmod rewrite headers

# Configurar el virtual host
RUN echo "<VirtualHost *:80>\n\
    ServerAdmin webmaster@localhost\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html>\n\
        Options Indexes FollowSymLinks MultiViews\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
    ErrorLog \${APACHE_LOG_DIR}/error.log\n\
    CustomLog \${APACHE_LOG_DIR}/access.log combined\n\
</VirtualHost>" > /etc/apache2/sites-available/000-default.conf

# Habilitar el sitio
RUN a2ensite 000-default.conf

# Instalar extensiones PHP necesarias
RUN docker-php-ext-install \
    bcmath \
    bz2 \
    calendar \
    iconv \
    intl \
    mbstring \
    opcache \
    pdo_mysql \
    zip \

# Exponer el puerto 80
EXPOSE 80
