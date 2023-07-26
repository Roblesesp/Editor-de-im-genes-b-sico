let currentSaturacion = 100;
    let currentBrillo = 100;
    let currentContraste = 100;
    let currentFuerzaColor = 0;
    let filtrosAplicados = false; // Variable para rastrear si se han aplicado filtros

    document.getElementById('input-imagen').addEventListener('change', function(e) {
      const imagen = document.getElementById('imagen-editar');
      const reader = new FileReader();

      reader.onload = function() {
        imagen.src = reader.result;
        imagen.style.width = '100%';
        imagen.style.height = 'auto';
        aplicarFiltros();
      };

      reader.readAsDataURL(e.target.files[0]);
    });

    function aplicarFiltros() {
      const imagen = document.getElementById('imagen-editar');
      const fuerzaColor = currentFuerzaColor / 100;
      const sepiaValue = fuerzaColor * 100;
      const filtro = `saturate(${currentSaturacion}%) brightness(${currentBrillo}%) contrast(${currentContraste}%) sepia(${sepiaValue}%)`;
      imagen.style.filter = filtro;
      filtrosAplicados = true; // Marcamos que se han aplicado filtros
    }

    document.getElementById('saturacion').addEventListener('input', function() {
      currentSaturacion = this.value;
      aplicarFiltros();
    });

    document.getElementById('brillo').addEventListener('input', function() {
      currentBrillo = this.value;
      aplicarFiltros();
    });

    document.getElementById('contraste').addEventListener('input', function() {
      currentContraste = this.value;
      aplicarFiltros();
    });

    document.getElementById('fuerza-color').addEventListener('input', function() {
      currentFuerzaColor = this.value;
      aplicarFiltros();
    });

    document.getElementById('ancho').addEventListener('input', function() {
      const imagen = document.getElementById('imagen-editar');
      const ancho = this.value;

      imagen.style.width = `${ancho}px`;
    });

    document.getElementById('alto').addEventListener('input', function() {
      const imagen = document.getElementById('imagen-editar');
      const alto = this.value;

      imagen.style.height = `${alto}px`;
    });

    document.getElementById('imagen-editar').addEventListener('error', function() {
      // Si ocurrió un error al cargar la imagen, establecemos una imagen de reemplazo
      this.src = 'Promt.png'; // Ruta de la imagen de reemplazo
    });

    document.getElementById('btn-descargar').addEventListener('click', function() {
      const canvas = document.createElement('canvas');
      const imagen = document.getElementById('imagen-editar');
      const formato = document.getElementById('formato').value;

      canvas.width = imagen.width;
      canvas.height = imagen.height;

      const context = canvas.getContext('2d');

      if (filtrosAplicados) {
        // Si se han aplicado filtros, los aplicamos antes de descargar
        const fuerzaColor = currentFuerzaColor / 100;
        const sepiaValue = fuerzaColor * 100;
        const filtro = `saturate(${currentSaturacion}%) brightness(${currentBrillo}%) contrast(${currentContraste}%) sepia(${sepiaValue}%)`;
        imagen.style.filter = filtro;
        context.filter = filtro;
        context.drawImage(imagen, 0, 0, canvas.width, canvas.height);
      } else {
        // Si no se han aplicado filtros, simplemente copiamos la imagen original en el canvas
        context.drawImage(imagen, 0, 0, canvas.width, canvas.height);
      }

      const enlaceDescarga = document.createElement('a');
      enlaceDescarga.href = canvas.toDataURL(`image/${formato}`);
      enlaceDescarga.download = `imagen_editada.${formato}`;
      enlaceDescarga.click();
    });
