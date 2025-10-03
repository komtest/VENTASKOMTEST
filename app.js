let machines = [];
let selectedMachine = null;
let selectedOptionalAccessories = [];

// Cargar datos de las máquinas
fetch('data/machines.json')
  .then(res => res.json())
  .then(data => {
    machines = data;
    renderMachines();
  })
  .catch(err => {
    console.error('Error al cargar machines.json:', err);
    document.getElementById('machines-container').innerHTML = '<p>Error al cargar los datos.</p>';
  });

function renderMachines() {
  const container = document.getElementById('machines-container');
  container.innerHTML = '';
  machines.forEach(m => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${m.image}" alt="${m.name}" onerror="this.style.display='none'">
      <h3>${m.name}</h3>
      <p>${m.description}</p>
    `;
    card.onclick = () => showMachine(m);
    container.appendChild(card);
  });
}

function showMachine(machine) {
  selectedMachine = machine;
  selectedOptionalAccessories = [];

  let specs = `<h2>${machine.name}</h2>`;
  specs += `<img src="${machine.image}" style="max-width:300px; margin:1rem 0; border-radius:8px;" onerror="this.style.display='none'">`;
  specs += `<p><strong>Tipo:</strong> ${machine.type}</p>`;

  if (machine.dimensions) {
    specs += `<p><strong>Dimensiones:</strong> ${machine.dimensions.width} × ${machine.dimensions.length} × ${machine.dimensions.height} cm</p>`;
  }
  if (machine.pressureRange) {
    specs += `<p><strong>Rango de presión:</strong> ${machine.pressureRange}</p>`;
  }
  if (machine.testTime) {
    specs += `<p><strong>Tiempo de prueba:</strong> ${machine.testTime}</p>`;
  }
  if (machine.temperatureControl) {
    specs += `<p><strong>Control de temperatura:</strong> ${machine.temperatureControl}</p>`;
  }
  if (machine.channels !== undefined) {
    specs += `<p><strong>Canales:</strong> ${machine.channels}</p>`;
  }

  if (machine.compatibleInjectors && machine.compatibleInjectors.length > 0) {
    specs += `<h4>Inyectores compatibles</h4><ul>`;
    machine.compatibleInjectors.forEach(i => specs += `<li>${i}</li>`);
    specs += `</ul>`;
  }

  if (machine.compatiblePumps && machine.compatiblePumps.length > 0) {
    specs += `<h4>Bombas compatibles</h4><ul>`;
    machine.compatiblePumps.forEach(p => specs += `<li>${p}</li>`);
    specs += `</ul>`;
  }

  if (machine.features && machine.features.length > 0) {
    specs += `<h4>Características</h4><ul>`;
    machine.features.forEach(f => specs += `<li>${f}</li>`);
    specs += `</ul>`;
  }

  document.getElementById('machine-info').innerHTML = specs;

  const std = document.getElementById('standard-accessories');
  if (machine.standardAccessories && machine.standardAccessories.length > 0) {
    std.innerHTML = machine.standardAccessories.map(a => `
      <div class="accessory">
        <img src="${a.image}" alt="${a.name}" onerror="this.style.display='none'">
        <p>${a.name}</p>
      </div>
    `).join('');
  } else {
    std.innerHTML = '<p>No incluye accesorios estándar.</p>';
  }

  const opt = document.getElementById('optional-accessories');
  if (machine.optionalAccessories && machine.optionalAccessories.length > 0) {
    opt.innerHTML = machine.optionalAccessories.map(a => `
      <div class="accessory" data-id="${a.id}">
        <img src="${a.image}" alt="${a.name}" onerror="this.style.display='none'">
        <p>${a.name}<br><strong>$${a.price}</strong></p>
      </div>
    `).join('');

    document.querySelectorAll('#optional-accessories .accessory').forEach(el => {
      el.onclick = () => {
        el.classList.toggle('selected');
        const id = el.dataset.id;
        const acc = machine.optionalAccessories.find(a => a.id === id);
        if (el.classList.contains('selected')) {
          if (!selectedOptionalAccessories.find(a => a.id === id)) {
            selectedOptionalAccessories.push(acc);
          }
        } else {
          selectedOptionalAccessories = selectedOptionalAccessories.filter(a => a.id !== id);
        }
      };
    });
  } else {
    opt.innerHTML = '<p>No hay accesorios opcionales para este modelo.</p>';
  }

  document.getElementById('machines-list').classList.add('hidden');
  document.getElementById('machine-detail').classList.remove('hidden');
}

// FICHA TÉCNICA - VERSIÓN DEFINITIVA CORREGIDA
function showTechSheet(machine) {
  console.log('🔍 Generando ficha técnica para:', machine.name);
  
  // Datos específicos CORREGIDOS - usando los nombres exactos que aparecen en el PDF
  const machineSpecs = {
    'CRI-2100 Test Bench': {
      dimensiones: '125 × 150 × 75 cm',
      peso: '450 kg',
      motor: '5.5 kW (7.4 HP)',
      bomba: '0.75 kW (1 HP)',
      voltaje: '220V trifásica',
      potenciaTotal: '8.5 HP'
    },
    'CRI-2300 Test Bench': {
      dimensiones: '125 × 150 × 75 cm',
      peso: '500 kg',
      motor: '5.5 kW (7.4 HP)',
      bomba: '0.75 kW (1 HP)',
      voltaje: '220V trifásica',
      potenciaTotal: '8.5 HP'
    },
    'CRIPUMP-2200 Test Bench': {
      dimensiones: '125 × 150 × 75 cm',
      peso: '500 kg',
      motor: '5.5 kW (7.4 HP)',
      bomba: '0.75 kW (1 HP)',
      voltaje: '220V trifásica',
      potenciaTotal: '8.5 HP'
    },
    'CRIPUMP-2400 Test Bench': {
      dimensiones: '170 × 150 × 75 cm',
      peso: '500 kg',
      motor: '5.5 kW (7.4 HP)',
      bomba: '0.75 kW (1 HP)',
      voltaje: '220V trifásica',
      potenciaTotal: '8.5 HP'
    },
    'CRPUMP-2700 Test Bench': {
      dimensiones: '140 × 150 × 75 cm',
      peso: '450 kg',
      motor: '5.5 kW (7.4 HP)',
      bomba: '0.75 kW (1 HP)',
      voltaje: '220V trifásica',
      potenciaTotal: '8.5 HP'
    },
    'UNIT-2500 Test Bench': {
      dimensiones: '125 × 150 × 75 cm',
      peso: '450 kg',
      motor: '3 kW (4 HP)',
      bomba: '0.75 kW (1 HP)',
      voltaje: '220V trifásica',
      potenciaTotal: '5.5 HP'
    },
    'UNIT-2600 Test Bench': {
      dimensiones: '125 × 150 × 75 cm',
      peso: '450 kg',
      motor: '3 kW (4 HP)',
      bomba: '0.75 kW (1 HP)',
      voltaje: '220V trifásica',
      potenciaTotal: '5.5 HP'
    },
    'HEUI-2800 Test Bench': {
      dimensiones: '76 × 157 × 123 cm',
      peso: '450 kg',
      motor: '3 kW (4 HP)',
      bomba: '0.75 kW (1 HP)',
      voltaje: '220V trifásica',
      potenciaTotal: '5.5 HP'
    },
    'PT-969 Test Bench': {
      dimensiones: '200 × 180 × 80 cm',
      peso: '600 kg',
      motor: '17.5 kW (23.5 HP)',
      bomba: '0.75 kW (1 HP)',
      voltaje: '220V trifásica',
      potenciaTotal: '24.5 HP'
    }
  };

  // Obtener especificaciones para esta máquina - USANDO EL NOMBRE EXACTO
  const specs = machineSpecs[machine.name] || {};
  console.log('🔍 Búsqueda de especificaciones:');
  console.log('Nombre de máquina:', machine.name);
  console.log('Claves disponibles:', Object.keys(machineSpecs));
  console.log('Especificaciones encontradas:', specs);

  // Si no se encuentran especificaciones, usar valores por defecto
  if (!specs.motor) {
    console.warn('⚠️ No se encontraron especificaciones para:', machine.name);
    console.log('🔍 Usando valores por defecto...');
  }

  const techSheetWindow = window.open('', '_blank', 'width=1000,height=700,scrollbars=yes,resizable=yes');
  
  if (!techSheetWindow) {
    alert('Por favor, permite ventanas emergentes para ver la ficha técnica.');
    return;
  }

  // Contenido HTML CORREGIDO - mostrando valores directamente
  const content = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Ficha Técnica - ${machine.name}</title>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                line-height: 1.6;
                color: #333;
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #0056b3;
                padding-bottom: 15px;
                margin-bottom: 20px;
            }
            .header h1 {
                color: #0056b3;
                margin: 0;
            }
            .machine-info {
                text-align: center;
                margin: 20px 0;
            }
            .section {
                margin: 25px 0;
            }
            .section-title {
                background: #f5f5f5;
                padding: 10px;
                border-left: 4px solid #0056b3;
                font-weight: bold;
                margin-bottom: 15px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
            }
            th, td {
                padding: 12px 15px;
                border: 1px solid #ddd;
                text-align: left;
            }
            th {
                background: #f9f9f9;
                width: 40%;
            }
            .power-value {
                background: #e7f3ff !important;
                font-weight: bold !important;
                color: #0056b3;
            }
            .footer {
                margin-top: 30px;
                padding-top: 15px;
                border-top: 1px solid #ddd;
                text-align: center;
                color: #666;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>KOMTEST AMERICA</h1>
            <h2>FICHA TÉCNICA</h2>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-ES')} | <strong>Código:</strong> ${machine.name}</p>
        </div>

        <div class="machine-info">
            ${machine.image ? `<img src="${machine.image}" alt="${machine.name}" style="max-width:300px; border:1px solid #ddd; border-radius:5px;">` : ''}
            <h3>${machine.name}</h3>
            <p><em>${machine.description}</em></p>
        </div>

        <!-- ESPECIFICACIONES TÉCNICAS PRINCIPALES -->
        <div class="section">
            <div class="section-title">ESPECIFICACIONES TÉCNICAS PRINCIPALES</div>
            <table>
                <tr>
                    <th>Modelo</th>
                    <td><strong>${machine.name}</strong></td>
                </tr>
                <tr>
                    <th>Dimensiones (Ancho × Alto × Largo)</th>
                    <td>${specs.dimensiones || '125 × 150 × 75 cm'}</td>
                </tr>
                <tr>
                    <th>Peso total</th>
                    <td>${specs.peso || '450 kg'}</td>
                </tr>
                <tr>
                    <th>Tensión de alimentación</th>
                    <td>${specs.voltaje || '220V trifásica'}</td>
                </tr>
                <tr>
                    <th>Potencia total instalada</th>
                    <td class="power-value">${specs.potenciaTotal || '8.5 HP'}</td>
                </tr>
            </table>
        </div>

        <!-- ESPECIFICACIONES DE POTENCIA -->
        <div class="section">
            <div class="section-title">ESPECIFICACIONES DE POTENCIA</div>
            <table>
                <tr>
                    <th>Motor principal</th>
                    <td class="power-value">${specs.motor || '5.5 kW (7.4 HP)'}</td>
                </tr>
                <tr>
                    <th>Bomba centrífuga</th>
                    <td class="power-value">${specs.bomba || '0.75 kW (1 HP)'}</td>
                </tr>
                <tr>
                    <th>Potencia total</th>
                    <td class="power-value">${specs.potenciaTotal || '8.5 HP'}</td>
                </tr>
            </table>
        </div>

        <!-- CARACTERÍSTICAS DE RENDIMIENTO -->
        <div class="section">
            <div class="section-title">CARACTERÍSTICAS DE RENDIMIENTO</div>
            <table>
                ${machine.pressureRange ? `
                <tr>
                    <th>Rango de presión</th>
                    <td>${machine.pressureRange}</td>
                </tr>
                ` : ''}
                ${machine.testTime ? `
                <tr>
                    <th>Tiempo de prueba</th>
                    <td>${machine.testTime}</td>
                </tr>
                ` : ''}
                ${machine.temperatureControl ? `
                <tr>
                    <th>Control de temperatura</th>
                    <td>${machine.temperatureControl}</td>
                </tr>
                ` : ''}
                ${machine.channels !== undefined ? `
                <tr>
                    <th>Canales de prueba</th>
                    <td>${machine.channels} canal(es) simultáneo(s)</td>
                </tr>
                ` : ''}
            </table>
        </div>

        <!-- REQUISITOS ELÉCTRICOS -->
        <div class="section">
            <div class="section-title">REQUISITOS ELÉCTRICOS</div>
            <table>
                <tr>
                    <th>Tensión de alimentación</th>
                    <td><strong>${specs.voltaje || '220V trifásica'}</strong></td>
                </tr>
                <tr>
                    <th>Potencia total instalada</th>
                    <td class="power-value"><strong>${specs.potenciaTotal || '8.5 HP'}</strong></td>
                </tr>
                <tr>
                    <th>Motor principal</th>
                    <td class="power-value"><strong>${specs.motor || '5.5 kW (7.4 HP)'}</strong></td>
                </tr>
                <tr>
                    <th>Bomba centrífuga</th>
                    <td class="power-value"><strong>${specs.bomba || '0.75 kW (1 HP)'}</strong></td>
                </tr>
                <tr>
                    <th>Protecciones eléctricas</th>
                    <td>Interruptor termomagnético, protección contra cortocircuitos y sobrecargas</td>
                </tr>
                <tr>
                    <th>Conexión eléctrica</th>
                    <td>Terminales de conexión trifásica con toma a tierra obligatoria</td>
                </tr>
            </table>
        </div>

        <!-- COMPATIBILIDAD -->
        <div class="section">
            <div class="section-title">COMPATIBILIDAD</div>
            
            ${machine.compatibleInjectors && machine.compatibleInjectors.length > 0 ? `
            <p><strong>Inyectores Compatibles:</strong></p>
            <ul>
                ${machine.compatibleInjectors.map(injector => `<li>${injector}</li>`).join('')}
            </ul>
            ` : ''}
        </div>

        <!-- ACCESORIOS -->
        ${machine.standardAccessories && machine.standardAccessories.length > 0 ? `
        <div class="section">
            <div class="section-title">ACCESORIOS INCLUIDOS</div>
            <ul>
                ${machine.standardAccessories.map(acc => `<li>${acc.name}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        <div class="footer">
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
            <p><strong>KOMTEST AMERICA</strong></p>
            <p>Diesel Injection Service | Miguel Sanchez | +593 99 341 4331</p>
            <p>Via Quevedo km 2 1/2, Santo Domingo de los Tsachilas, Ecuador</p>
            <p>www.komtest.net | info@komtest.net | +90 212 555 01 02</p>
            <p>Organize Sanayi Bölgesi, Turgut Özal Cad. No: 15, 34555 Estambul, Turquía</p>
            <p style="margin-top: 10px; font-size: 10px; color: #999;">
                Los datos técnicos pueden variar sin previo aviso. Consulte siempre la documentación más reciente.
            </p>
        </div>

        <div style="margin-top: 20px; text-align: center;">
            <button onclick="window.print()" style="padding: 10px 20px; background: #0056b3; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
                Imprimir / Guardar como PDF
            </button>
            <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
                Cerrar Ventana
            </button>
        </div>

        <script>
            console.log('Ficha técnica cargada correctamente');
            window.focus();
        </script>
    </body>
    </html>
  `;

  techSheetWindow.document.write(content);
  techSheetWindow.document.close();
  
  console.log('✅ Ficha técnica generada correctamente');
  console.log('📊 Valores mostrados:');
  console.log('   - Motor:', specs.motor || '5.5 kW (7.4 HP)');
  console.log('   - Bomba:', specs.bomba || '0.75 kW (1 HP)');
  console.log('   - Potencia Total:', specs.potenciaTotal || '8.5 HP');
}

// PROFORMA COMERCIAL - VERSIÓN MEJORADA CON IMAGEN
document.getElementById('btn-generate').onclick = function() {
  if (!selectedMachine) {
    alert('Error: No hay máquina seleccionada.');
    return;
  }

  const accessories = selectedOptionalAccessories;

  const formHTML = `
    <div id="proforma-form" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
      <div style="background: white; padding: 20px; border-radius: 10px; max-width: 95%; width: 500px; max-height: 90vh; overflow-y: auto;">
        <h3 style="margin-top: 0;">Proforma - ${selectedMachine.name}</h3>
        <form id="proforma-data" style="display: flex; flex-direction: column; gap: 10px;">
          <label style="display: flex; flex-direction: column;">
            Cliente: 
            <input type="text" name="client" required style="padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
          </label>
          <label style="display: flex; flex-direction: column;">
            Empresa: 
            <input type="text" name="company" required style="padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
          </label>
          <label style="display: flex; flex-direction: column;">
            País: 
            <input type="text" name="country" required style="padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
          </label>
          <label style="display: flex; flex-direction: column;">
            Email / Teléfono: 
            <input type="text" name="contact" style="padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
          </label>
          <label style="display: flex; flex-direction: column;">
            Precio equipo ($): 
            <input type="number" name="machinePrice" value="25000" min="0" step="100" required style="padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
          </label>
          <label style="display: flex; flex-direction: column;">
            Descuento (%): 
            <input type="number" name="discount" value="0" min="0" max="100" style="padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
          </label>
          <label style="display: flex; flex-direction: column;">
            Flete estimado ($): 
            <input type="number" name="freight" value="800" min="0" style="padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
          </label>
          <label style="display: flex; flex-direction: column;">
            Tiempo de entrega (días): 
            <input type="number" name="delivery" value="15" min="1" style="padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
          </label>
          <label style="display: flex; flex-direction: column;">
            Garantía (meses): 
            <input type="number" name="warranty" value="12" min="1" style="padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
          </label>
          <label style="display: flex; flex-direction: column;">
            Validez (días): 
            <input type="number" name="validity" value="30" min="1" style="padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
          </label>
          <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button type="submit" style="flex: 1; min-width: 120px; padding: 10px; background: #0056b3; color: white; border: none; border-radius: 5px; cursor: pointer;">Generar Proforma</button>
            <button type="button" id="cancel-proforma" style="flex: 1; min-width: 120px; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', formHTML);

  document.getElementById('cancel-proforma').onclick = function() {
    document.getElementById('proforma-form').remove();
  };

  document.getElementById('proforma-data').onsubmit = function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const base = parseFloat(data.machinePrice);
    const discount = (base * parseFloat(data.discount || 0)) / 100;
    const freight = parseFloat(data.freight || 0);
    const total = base - discount + freight;

    let accList = '';
    accessories.forEach(acc => {
      accList += `<li>${acc.name} — $${acc.price}</li>`;
    });

    // PROFORMA MEJORADA CON IMAGEN DE LA MÁQUINA
    const proforma = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0056b3; margin: 0;">KOMTEST AMERICA</h1>
        </div>
        <h2 style="color: #0056b3; text-align: center; border-bottom: 2px solid #0056b3; padding-bottom: 10px;">
          PROFORMA COMERCIAL
        </h2>
        <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
        <p><strong>Validez:</strong> ${data.validity} días</p>
        <hr>
        <h3>Datos del Cliente</h3>
        <p><strong>Nombre:</strong> ${data.client}</p>
        <p><strong>Empresa:</strong> ${data.company}</p>
        <p><strong>País:</strong> ${data.country}</p>
        <p><strong>Contacto:</strong> ${data.contact}</p>
        <hr>
        <h3>Equipo</h3>
        <div style="display: flex; align-items: flex-start; gap: 20px; margin: 15px 0;">
          ${selectedMachine.image ? `
          <div style="flex-shrink: 0;">
            <img src="${selectedMachine.image}" alt="${selectedMachine.name}" 
                 style="max-width: 200px; border: 1px solid #ddd; border-radius: 5px; padding: 5px;">
          </div>
          ` : ''}
          <div style="flex: 1;">
            <p><strong>${selectedMachine.name}</strong></p>
            <p>${selectedMachine.description}</p>
          </div>
        </div>
        <hr>
        ${accList ? `
        <h3>Accesorios adicionales</h3>
        <ul>${accList}</ul>
        <hr>
        ` : ''}
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
          <tr><td>Precio equipo</td><td style="text-align: right;">$${base.toFixed(2)}</td></tr>
          ${discount > 0 ? `<tr><td>Descuento (${data.discount}%)</td><td style="text-align: right; color: red;">-$${discount.toFixed(2)}</td></tr>` : ''}
          <tr><td>Flete estimado</td><td style="text-align: right;">$${freight.toFixed(2)}</td></tr>
          <tr style="border-top: 2px solid #000;"><td><strong>TOTAL</strong></td><td style="text-align: right;"><strong>$${total.toFixed(2)}</strong></td></tr>
        </table>
        <hr>
        <h3>Condiciones Comerciales</h3>
        <p><strong>Tiempo de entrega:</strong> ${data.delivery} días hábiles desde confirmación de pago.</p>
        <p><strong>Garantía:</strong> ${data.warranty} meses contra defectos de fabricación.</p>
        <p><strong>Forma de pago:</strong> 100% por transferencia bancaria antes del envío.</p>
        <p><strong>Incoterms:</strong> FOB Puerto de embarque, Turquía.</p>
        <p><strong>Documentación:</strong> Factura comercial, lista de empaque, certificado de origen.</p>
        <p><strong>Soporte técnico:</strong> Incluido durante la garantía vía remota.</p>
        <hr>
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
          <p><strong>KOMTEST AMERICA</strong></p>
          <p>Diesel Injection Service | Miguel Sanchez | +593 99 341 4331</p>
          <p>Via Quevedo km 2 1/2, Santo Domingo de los Tsachilas, Ecuador</p>
          <p>www.komtest.net | info@komtest.net | +90 212 555 01 02</p>
          <p>Organize Sanayi Bölgesi, Turgut Özal Cad. No: 15, 34555 Estambul, Turquía</p>
        </div>
      </div>
    `;

    document.getElementById('proforma-form').remove();
    document.getElementById('proforma-content').innerHTML = proforma;
    document.getElementById('machine-detail').classList.add('hidden');
    document.getElementById('proforma-view').classList.remove('hidden');
  };
};

// NAVEGACIÓN
document.getElementById('btn-back').onclick = function() {
  document.getElementById('machine-detail').classList.add('hidden');
  document.getElementById('machines-list').classList.remove('hidden');
};

document.getElementById('btn-back-proforma').onclick = function() {
  document.getElementById('proforma-view').classList.add('hidden');
  document.getElementById('machine-detail').classList.remove('hidden');
};

document.getElementById('btn-print').onclick = function() {
  const printContent = document.getElementById('proforma-content').innerHTML;
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Proforma - ${selectedMachine.name}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 20px; 
          line-height: 1.4;
        }
        @media print { 
          body { margin: 15mm; }
          img { max-width: 180px !important; }
        }
      </style>
    </head>
    <body>
      ${printContent}
      <div style="text-align: center; margin-top: 20px;">
        <button onclick="window.print()" style="padding: 10px 20px; background: #0056b3; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Imprimir / Guardar como PDF
        </button>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
};

// EVENT LISTENER PARA EL BOTÓN DE FICHA TÉCNICA
document.addEventListener('DOMContentLoaded', function() {
  const btnTechSheet = document.getElementById('btn-tech-sheet');
  if (btnTechSheet) {
    btnTechSheet.addEventListener('click', function() {
      if (!selectedMachine) {
        alert('Error: No hay máquina seleccionada.');
        return;
      }
      console.log('Generando ficha técnica para:', selectedMachine.name);
      showTechSheet(selectedMachine);
    });
  } else {
    console.error('No se encontró el botón btn-tech-sheet');
  }

});


