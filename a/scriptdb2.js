
  
     
        function openInFirstTab(url) {
    // Pega a primeira aba armazenada no map de tabs
    const firstTabId = Array.from(tabs.keys())[0]; 
    if (!firstTabId) return;

    const firstTab = tabs.get(firstTabId);
    const resolvedUrl = resolveSpecialUrl(url);

    // Atualiza webview da primeira aba
    firstTab.webview.src = resolvedUrl;
    firstTab.url = resolvedUrl;

    // Faz a primeira aba ficar ativa
    switchTab(firstTabId);
}

    
      let tabCount = 0;
      const iframes = new Map();
      
      const tabs = document.getElementById('tabs');
    


function closeAlert() {
  document.getElementById('dbAlert').style.display = 'none';//FECHAR ALERT
}
document.addEventListener('click', function(event) {
  const target = event.target.closest('a');
  if (!target) return;

  const link = target.dataset.url || target.href;
  if (!link) return;

  event.preventDefault();      // impede o comportamento padrão
  event.stopPropagation();     // evita propagação que poderia abrir duas vezes

  // Links especiais abrem nos seus leitores/visualizadores em nova aba
  if (link.endsWith('.pdf')) {
    window.open(
      `https://bizoonydb.github.io/PDFJS/web/viewer.html?file=${encodeURIComponent(link)}`,
      '_blank'
    );
  } else if (link.endsWith('.bvr')) {
    window.open(
      `https://bizoonydb.github.io/PDFJS/HANDSVIEW/index.html?fileLink=${encodeURIComponent(link)}`,
      '_blank'
    );
  } else if (link.endsWith('_db') || link.endsWith('_hs')) {
    window.open(link, '_blank');
  } else {
    // Links normais abrem na mesma aba
    window.location.href = link;
  }
});



    


   
      // Código para buscar arquivos
      const folders = document.querySelectorAll('details');

      document.getElementById('search').addEventListener('input', function() {
          const searchTerm = this.value.trim().toLowerCase();

          if (searchTerm === '') {
              // Se a barra de pesquisa estiver vazia, fechar todas as pastas
              folders.forEach(folder => {
                  folder.removeAttribute('open');
              });
          } else {
              // Se houver texto na barra de pesquisa, realizar a filtragem
              folders.forEach(folder => {
                  searchFolder(folder, searchTerm);
              });
          }
      });

      function searchFolder(folder, searchTerm) {
        const folderSummaries = folder.querySelectorAll('summary');
        const files = folder.querySelectorAll('.file');
    
        let foundInFolder = false;
    
        // Limpa qualquer marcação anterior
        folderSummaries.forEach(summary => {
            summary.classList.remove('highlight');
        });
        files.forEach(file => {
            file.classList.remove('highlight');
        });
    
        // Verifica se o nome da pasta (summary) corresponde ao termo de pesquisa
        folderSummaries.forEach(summary => {
            const folderName = summary.textContent.trim().toLowerCase();
    
            if (folderName.includes(searchTerm)) {
                summary.classList.add('highlight');  // Marca a pasta
                foundInFolder = true;
            }
        });
    
        // Verifica se há arquivos correspondentes dentro da pasta
        files.forEach(file => {
            const fileName = file.textContent.trim().toLowerCase();
    
            if (fileName.includes(searchTerm)) {
                file.classList.add('highlight');  // Marca o arquivo
                foundInFolder = true;
            }
        });
    
        // Se encontrou algum arquivo ou pasta correspondente, abre a pasta
        if (foundInFolder) {
            folder.setAttribute('open', 'true');
        } else {
            folder.removeAttribute('open');
        }
    
        // Verifica pastas dentro desta pasta (recursivamente)
        folderSummaries.forEach(summary => {
            const subFolder = summary.nextElementSibling;
            if (subFolder && subFolder.tagName === 'DETAILS') {
                searchFolder(subFolder, searchTerm);
            }
        });
    }
    
      // Impedir menu de contexto ao clicar com o botão direito nos arquivos
      const files = document.querySelectorAll('.file');
      files.forEach(file => {
          file.addEventListener('contextmenu', e => {
              e.preventDefault();
          });
      });

      // Impedir evento de arrastar nos arquivos
      files.forEach(file => {
          file.addEventListener('dragstart', e => {
              e.preventDefault();
          });
      });

        // Função para abrir o modal
        const openModalBtn = document.getElementById('openModalBtn');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const modal = document.getElementById('userModal');

        openModalBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });

        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Função para carregar os dados dos usuários
        function loadUserData() {
          const usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];
          
          // Se não houver usuários cadastrados
          if (usuariosCadastrados.length === 0) {
              document.getElementById('userList').innerHTML = '<p>Nenhum usuário encontrado.</p>';
              return;
          }

          usuariosCadastrados.reverse(); // Exibe o mais recente primeiro

          let userListHTML = '';
          usuariosCadastrados.forEach((user, index) => {
              userListHTML += `
                  <div class="user-item">
                      <strong>USER ${index + 1}:</strong><br>
                      <label>E-MAIL:</label><span>${user.email}</span><br> <!-- Exibindo o e-mail cadastrado -->
                      <label>USUARIO<i class="fas fa-user"></i>:</label><span>${user.username}</span><br>
                      <label>SENHA<i class="fas fa-key"></i>:</label><span>${user.password}</span>
                      <br>
                      <label>DATA DE CADASTRO:</label><span>${user.registrationDate}</span><br>
                     
               <label><p>ATIVAÇÃO:</p></label><span>DBED****</span>
                     
                  </div>
              `;
          });

          document.getElementById('userList').innerHTML = userListHTML;
      }

      // Carregar os dados assim que o modal for aberto
      openModalBtn.addEventListener('click', loadUserData);
      
 
   
///VERIFICAÇAO DE CÓDIGO PARA ACESSO AOS DRONES
        const linksBci = document.querySelectorAll('.link-bci');
        const modalbci = document.getElementById('modalbci');
        const inputCodigo = document.getElementById('codigoInput');
        const btnConfirmar = document.getElementById('confirmarBtn');
        const codigoCorreto = "DBED1704";
        const chaveLocalStorage = "bci_ativado";

        let destino = "";

        linksBci.forEach(link => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                destino = this.dataset.url;

                if (localStorage.getItem(chaveLocalStorage) === "true") {
                    window.location.href = destino;

                } else {
                    modalbci.style.display = "flex";
                    inputCodigo.focus();
                }
            });
        });

        btnConfirmar.addEventListener("click", function () {
            const valorDigitado = inputCodigo.value.trim();
            if (valorDigitado === codigoCorreto) {
                localStorage.setItem(chaveLocalStorage, "true");
                modalbci.style.display = "none";
                inputCodigo.value = "";
                window.location.href = destino;

            }
        });

        window.addEventListener("click", function (e) {
            if (e.target === modalbci) {
                modalbci.style.display = "none";
                inputCodigo.value = "";
            }
        });

     

      // SETOR DE BUSCA POR CI 
        // Dados de exemplo
        const celulares = {


                                //<---LINHA A--->
            "SAMSUNG": {
               "CELULAR": { "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-A015": {"B318 KMQE60013M": "MEMORIA", "SDM439": "CPU", "K318": "AUDIO", "AW9961DNR": "BACKLIGHT", "7219M-71": "PA 3G", "WTR2965-0VV": "RF", "AP6716M-61": "PA 2G", "PMI632": "CARGA",  "WCN3615": "WIFI", "PM439": "PMIC" },

                "SM-A013": {"AW8896": "AUDIO", "MT6739V": "CHIPSET", "KMFE60012M B214": "MEMORIA", "LM36274": "BACKLIGHT", "S2MU005X03 60B4CT": "CARGA", "W33282": "RF", "MT6177MV": "RF", "SKY77621-31": "PA DE REDE", "MT6625LN": "WIFI BT","MT6357V": "PMIC" },

                "SM-A022": {"G53A": "SETOR", "LM36273": "BLIC", "AWINIC-AW8896": "AUDIO", "mt6739v": "CHIPSET", "KMQX60013A-B419": "MEMORIA", "S2MU005X03": "IFPMIC", "MT6357V": "PMIC", "SKY77621-31": "PA DE REDE", "MT6625LN": "WIFI BT", "MT6177MV": "RF", "KMGX6001BA-B514": "MEMORIA", "LM36274": "BACKLIGHT","77624-31": "PA 3G",},

                
                "SM-A025": {"VC7643": "PA 3G", "PMI632 902": "IF PMIC", "KMRP60014M-B614": "MEMORIA", "SDM450": "CPU", "WCN3615-0VV": "WIFI BT", "AW9961DNR": "BACKLIGHT", "VC7916-93": "PA 2G", "PM8953": "POWER", "WTR2965": "RF" ,"5267G": "", "5627G": "", "SGM41511": "CARGA", "MT6765V": "CPU", "KMGX6001BA-B514": "MEMORIA","AL65": "BACKLIGHT", "MT6631N": "WIFI", "MT6357CVR": "POWER", "MT6177MV": "RF",},

                "SM-A032": {"SGM41511": "CARGA", "151X": "AUDIO", "LUH 122U": "DISPLAY", "SC9863A": "CHIPSET", "AL65": "BACKLIGHT", "AW9961DNR": "BACKLIGHT", "NT50358": "DISPLAY", "KMQX60013A-B419": "MEMORIA", "QM8443-22": "PA", "QM8816-62": "PA", "SC2721G": "POWER", "SR3595D": "RF"},

                "SM-A035": {"RF5627G": "PA", "K318": "AUDIO", "SGM41511": "CARGA", "UMS9230": "CPU", "KMDV6001BD-B625": "MEMORIA", "UMW2652": "WIFI", "UMP510G": "PMIC", "AL65": "BACKLIGHT", "AW9961DNR": "BACKLIGHT", "630S": "DISPLAY", "NT50358": "DISPLAY", "RF5596G": "PA", "SR3595D": "PA",},

                "SM-A037": {"5627G": "PA", "BQ25601": "CARGA", "MT6765V": "CHIPSET", "KMRP60014M-B614": "MEMORIA", "MT6631N": "WIFI", "AW9961DNR": "BACKLIGHT", "TPS65132A0": "DISPLAY", "1559": "AUDIO", "5596G": "PA", "MT6357CRV": "POWER", "MT6177MV": "RF",  "ci": "setor"},

                "SM-A042": {"5627R": "PA", "AXCNZ": "PA", "SGM41513": "CARGA", "RT9471GQW": "CARGA", "MT6765V": "CHIPSET", "KM4X60002M-B321": "MEMORIA", "MT6631N": "WIFI", "63QS": "DISPLAY", "ABS0": "DISPLAY", "AL65": "BACKLIGHT", "AW9961DNR": "BACKLIGHT", "5196": "PA", "MT6357CRV": "POWER", "JDHOZ": "PA 3G", "MT6177MV": "RF",},

                "SM-A045": {"5627G-PMERZ": "PA", "331-AAPJ1": "NULL", "CDDD11": "CARGA", "SY6970QCC": "CARGA", "MT6765V": "CHIPSET", "LUM218M": "DISPLAY",  "AL65": "BACKLIGHT", "AW9961DNR": "BACKLIGHT", "KMDC6001DM-B625": "MEMORIA", "HL7593W2": "BUCK CDRAM", "MT6631N": "WIFI", "MT6357CRV": "POWER", "MT6177MV": "RF", "5596G": "PA", "FX5596H": "PA",},

                "SM-A047": {"MBGA-ASDI": "BACKLIGHT", "FS1818": "AUDIO", "A2TDR2C": "CPU", "EXYNOS-850": "CPU", "KMDP6001DB-B425": "MEMORIA", "EMAEJP": "CARGA", "SY6970": "CARGA", "S518-60KN32": "POWER", "QM58110": "PA", "E052": "PA", "S612-W2232": "WIFI", "W332322-P6C231": "PA", "D3LK-W27J": "PA",},

                "SM-A055": {"5627Y-HDBDZ": "PA", "2130-2333": "NULL", "GGNU042339": "CARGA", "KMDC6001DM-B625": "MEMORIA", "MT6769V": "CPU", "MT6631N": "WIFI", "3NCS": "BLIC", "LUM309C": "DISPLAY", "5596Y-KCA0Z": "PA", "AEAB-D215": "AUDIO", "MT6358W": "POWER", "MT6177MV": "RF",},
                
                "SM-A057": {"5627Y-KBBIZ": "PA", "SM5602-HW2F": "NULL", "GGKN862334": "CHARGER", "SM6225-000": "CPU", "KM2L9001CM-B518": "MEMORIA", "WCD9370-001": "AUDIO", "WCN3988-000": "WIFI", "63QS": "DISPLAY", "AW9961DNR": "BACKLIGHT", "5596E-KZAYZ": "PA", "WTR2965-0VV": "RF", "PM6225-001": "POWER", "PWFG-AAF4": "NULL",},

                "SM-A065": {"5627YA": "PA", "UPM6722": "CARGA", "SC8541CFFR": "CARGA", "SGMGKB": "CARGA", "RT9471GQW": "CARGA","MT6769V-2425": "CPU", "KMDC6001DM-B625": "MEMORIA", "MT6631N-2417": "WIFI", "SGM3756YTDI6G": "BACKLIGHT", "LUM420M": "DISPLAY", "SM5109": "DISPLAY", "UCUFA": "NULL", "HUSB311_ACC": "NULL",  "MT6177MV": "RF",  "5596YA": "PA",  "MT6358W": "POWER",},

                "SM-A102": {"S2DPS01": "BACKLIGHT", "SMA1301": "AUDIO", "KLMBG2JETD": "MEMORIA", "Exynos 7884": "CPU", "SEC 943": "CPU", "LHT03 W9A28": "NULL", "S527S 608XRR ": "POWER", "G1941R76": "POWER", "S2MU205X01": "CARGA", "S760 W1945": "NULL", "QM78143": "PA", "LMSWKSGU-K21": "PA", "SKY77656-11": "PA 3G", "S612 ": "WIFI BT", "QM48184": "RF", "S925D2": "RF",},

                "SM-A105": {"EXYNOS 7884": "CPU", "LM3632AYFFR": "BACKLIGHT", "S527S": "POWER", "S2MPU08A02": "POWER", "SMA1301": "AUDIO", "S2MU005X03": "CARGA", "WIPS33232-01": "PA", "WIPS114640-23": "PA", "LMSWKQGR": "PA", "S915": "RF", "S5M9150X01": "RF", "S5N5C12X01": "WIFI", "KLMBG2JETD": "MEMORIA",},

                "SM-A107": {"AW9961DNR": "BACKLIGHT", "6937 924C": "CARGA", "BQ24157YFFR": "CARGA", "SM5109": "DISPLAY", "MT6762V": "CPU", "KMQD60013M-B318": "MEMORIA", "MT6631N": "WIFI", "AW87319": "AUDIO", "MT6357CRV": "POWER", "Vc7916-53": "PA 2G", "7219M-71": "PA 2G", "MT6177MV": "RF",},

                "SM-A115": {"56030-66AB": "PA 3G", "PMI632-902": "CARGA", "AW9961DNR": "BACKLIGHT", "KMGX6001BA-B514": "MEMORIA", "SDM450": "CPU", "WCN3615-0VV": "WIFI", "PM8953-0VV": "PMIC", "RF5212A": "PA 2G", "WTR2965": "RF",    },

                "SM-A125": {"LM36274": "DISPLAY", "SMA1303": "AUDIO", "MT6765V": "CPU", "KM3V6001CA": "MEMORIA", "SM5714": "CARGA", "MT6357CRV": "POWER", "SKY77621": "PA 3G", "W33232": "PA", "MT6631N-2122": "WIFI BT", "MT6177MV": "RF",},

                "SM-A127": {"LM36274": "DISPLAY", "SMA1303": "AUDIO", "A1FPAII1": "CPU", "EXYNOS-850": "CPU", "KM3V6001CA": "MEMORIA", "SM5714": "CARGA", "S518": "PMIC", "SKY77656-11": "PA", "S915": "RF", "W33232": "PA", "S612": "WIFI BT",},

                "SM-A135": {"W33232": "PA", "LWTA": "BLIC", "LM36274": "BLIC", "1Z15 AAF3": "AUDIO", "EXYNOS 850": "CPU", "KMDV6001DB-B625": "MEMORIA", "EMAEAD": "CARGA", "SGM41511": "CARGA",    "PBA3": "CAM PMIC", "S518-60GX8P": "PMIC", "58110-9ZFU": "PA", "S915-SGC9W": "RF", "S612-W2205": "WIFI BT",},

                "SM-A145": {"1Z15-ABC1": "AUDIO", "A2X71ITPA": "CPU", "EXYNOS-850": "CPU", "KM3V6001CB-B708": "MEMORIA", "S2MU106X02": "CARGA", "RN4VXS": "NFC", "LM36274": "DISPLAY E BACKLIGHT", "W33232-P52326": "PA", "S518-60RFF2": "PMIC", "QM58110-FC2R": "PA", "S915-SHYXF": "RF", "S612-W2334": "WIFI BT", },

                "SM-A146B": {"QM81050": "", "QPA4580": "PA", "QM81050": "", "ALC5691": "AUDIO", "1Z15-ABB2": "AUDIO", "EXYNOS-1330": "CPU", "E8535": "CPU", "KM5P9001DM-B424": "MEMORIA", "SM5714-JU2C": "CARGA", "83M7B-TRSRR": "", "W37E-1F2": "", "91C-W323": "", "SPU15-60PH2R": "POWER", "RL-MVK0": "DISPLAY E BACKLIGHT", "SPA05+60R5T1": "", "K72-080097": "", "83M7B-TRSRR": "", "40365-092319": "", "D5NM-W37M": "", "S5525-2328": "", "QM81050": "", "QM78078": "PA","S620-W2322": "WIFI BT", },

                "SM-A146P": {"S55643-22": "PA", "311NTEM": "", "MT6308MP-2219": "PMIC", "MT6360MP": "PMIC", "MT6833V": "CPU", "KM2L9001CM": "MEMORIA", "NXP55701": "NFC", "MT6631N-2244": "WIFI BT", "MT6365VPW": "PMIC", "AL65": "BLIC", "AW9961DNR": "BLIC", "X74LD1": "", "5109-K01T": "DISPLAY", "MT6315NP": "POWER", "MT6308MP": "POWER", "83K5A-CNRRE": "PA", "9122C-CRSAL": "", "S55643-22": "PA", "MT6190MV": "RF", "S55257-12": "",},

                "SM-A155": {"0S15A-G2409": "BLIC", "1Z15-ABM2": "AUDIO", "MT6789V": "CPU", "SM5461-MM3B": "", "PBA3-G2407": "CAM PMIC", "SM5714A": "CARGA", "KM8F9001JA-B816": "MEMORIA", "NXP55701": "NFC", "MT6366MW": "POWER", "-2R": "PA", "MT6186MV": "RF", "MT6631N-2406": "WIFI BT", },

                "SM-A156E": { "MT6631N": "WIFI BT", "MT6308MP": "POWER", "MT6308MP": "POWER", "0S15A-G2348": "BLIC", "SMA1305": "AUDIO", "MT6835V": "CPU", "KM8F9001JA-B816": "MEMORIA", "SM5461-MM2V": "CARGA", "MT6375P": "POWER", "PBA3-G2333": "PMIC CAM", "NXP55701": "NFC",  "83M7B-TRSTR": "", "MT6319NP": "","115749-2R": "PA", "K72-090148": "", "MT6197W": "RF", "4243-S22343": "", "961BS-ARSTH": "PA", "ci": "setor", "MT6377W": "POWER", },


                "SM-A202": { "S2DPS01": "BACKLIGHT", "SMA1301": "AUDIO", "KLMBG2JETD": "MEMORIA", "EXYNOS-7884": "CPU", "RN82XS2": "NFC", "MU106X01": "POWER", "S527S-6088VZM": "POWER", "ABA-81AF": "", "SKY77786-1": "PA", "SKY77656-11": "PA", "S915-S9GA4": "RF", "W1918-S9DN3": "WIFI BT GPS",},

                "sm-a205": { "S2MU106X01": "CARGA", "KLMBG2JETD": "MEMORIA", "EXYNOS-7884": "CPU", "SM3010": "BACKLIGHT", "S5N5C12X01": "WIFI BT", "S2MPU08A02": "POWER", "SMA1301": "AUDIO", "WIPS33232": "PA", "WIPS114640": "PA", "LMSWKQGR": "PA", "S5M9150X01": "RF", "ci": "setor",},

                "SM-A207": { "AW9961DNR": "BACKLIGHT", "PMI632": "CARGA", "KMGD6001BM": "MEMORIA", "AWINIC 87329": "AUDIO", "SDM450": "CPU", "WCN3615": "WIFI BT", "AP6716M": "PA 2G", "7219M-71": "PA 3G", "PM8953-0VV": "POWER", "WTR2965-0VV": "RF", "ci": "setor", "ci": "setor",},


                "SM-A217": { "KM3H6001CA-B515": "MEMORIA", "NKPC80YA": "CPU", "EXYNOS-850": "CPU", "SMA1303": "AUDIO", "LM36274": "AUDIO", "S518": "POWER", "ET9553M": "OVP", "S2MU106X01": "CARGA", "SKY77656-11": "PA", "S915": "RF", "W33232": "", "ci": "setor",},

                "SM-A225": { "SM3010": "BACKLIGHT", "AW8896": "AUDIO", "MT6769V": "CPU", "KM3V6001CA-B708": "MEMORIA", "SM5714": "CARGA", "TS5MP646": "CAM", "MT6358W": "POWER", "115749-2R": "PA", "W33232-SCC114": "PA", "MT6631N": "WIFI BT", "MT6177W-2117AFAH": "RF", "ci": "setor",},

                "SM-A226": { "S55255": "PA", "VC7643": "PA", "MT6308MP": "POWER", "VC7643": "PA", "MT6360UP": "CARGA", "SIA8109": "AUDIO", "MT6833V": "CPU", "SM5109": "DISPLAY", "KM3V6001CM": "MEMORIA", "MT6631N": "WIFI BT", "MT6365VPW": "POWER", "AW9961DNR": "BACKLIGHT",  "MT6315NP": "POWER",  "MT6308MP": "POWER",  "VC7920": "PA",  "MT6190MV": "PA",},

                "SM-A235": { "S2DPS01": "BACKLIGHT", "878B": "AUDIO", "WCD9370": "AUDIO", "SM6225-000": "CPU", "KM2L9001CM": "MEMORIA", "S2MU106X01": "CARGA", "WON10-YFL0030": "", "MM07-L1E": "", "T646": "CAM", "RN4VXS": "NFC", "PM6225": "POWER", "W33232": "PA", "QM58110": "PA", "WCN3988": "WIFI BT", "WTR2965": "RF", "ci": "setor",},

                "SM-A236": { "TAS2-SAH": "AUDIO", "QPM6815": "PA", "WCD9370": "AUDIO", "SM6375": "CPU", "2IA92-JZ386": "MEMORIA", "WQN10": "", "HL7132": "", "S2MU106X01": "CARGA", "PBA3-G2226": "CAM PMIC", "PM6375": "POWER", "21NFCJ-A9247": "NFC", "PMR735A": "POWER",  "MBEV-BWCS": "DISPLAY",  "E214-000": "",  "QPM6810": "PA", "SDR735": "RF", "WCN3988": "WIFI", "SKY8267": "PA", "QPA5580": "PA",  "QFM3576": "RF", },

                "SM-A245": { "D0S15-62210": "BACKLIGHT", "SMA1305": "AUDIO", "MT6789V": "CPU", "KM8L9001JM-B624": "MEMORIA", "YFL0201": "", "L2P02L": "", "HL7132": "", "SM5714": "CARGA", "PBA3-G2312": "CAM PMIC", "MT6366MW": "POWER", "NXP55701": "NFC", "115749": "PA", "W33232": "PA", "MT6631N": "WIFI BT", "MT6186MV": "RF", "ci": "setor", "ci": "setor","ci": "setor", },

                "SM-A256": { "5620-W2345": "", "878B-3451": "AUDIO", "ET9523CL": "", "0S15A": "BACKLIGHT", "ALC5665": "AUDIO", "ET9553M": "OVP", "QM81050": "", "WQN10": "", "S2MF301A": "CARGA", "EXYNOS-1280": "CPU", "E8825": "CPU", "KM8F9001JA": "MEMORIA","21NFCJ-A92692": "NFC", "SPU14P": "POWER", "QDM3570": "", "SPU13P": "POWER", "QPA4580": "PA", "QRQZA-170029": "PA", "SHANN0N5511": "RF", "QPM4850": "PA",},

                "SM-A260": { "Exynos 7870": "CPU", "K4E8E324EBAGCF": "RAM", "S2DPS01": "BACKLIGHT", "SDINBDG4": "MEMORIA", "S2MU005X03": "CARGA", "SKY77759": "PA", "SKY77912": "PA", "S925D S9W6AVY1 ": "RF", "SKY77786": "PA", "BCM43436LH": "WIFI BT", "S515 608N3F 1928LLH": "POWER", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-A300": { "MSM8916": "CPU", "KMQ31000SM": "MEMORIA", "WCN3620": "WIFI BT", "HRPF59622B": "PA", "WTR1605L": "RF", "SM3004": "BACKLIGHT", "S3FWRN5XS1": "NFC", "PM8916": "POWER", "SWHZ-GNF91": "PA", "SKY8111": "PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-A305": { "S2MU106X01": "CARGA", "1107-002633": "MEMORIA", "EXYNOS-7904": "CPU", "SM3010": "BACKLIGT", "S5N5C12X01": "WIFI BT", "S527S": "POWER", "77656": "PA", "010166": "PA", "S925D2": "RF", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-A3050": { "TFA9896BUK": "AUDIO", "EXYNOS-7904": "CPU", "SM3010": "BACKLIGHT", "SFML7E0N": "PA", "S527S": "POWER", "S2MU106X01": "CARGA", "D5328": "PA", "SKY77656": "PA", "S92502": "RF", "WIPS33232": "PA", "S612": "WIFI", "KLMCG2UCTA": "MEMORIA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                
                "SM-A307": { "S2MU106X01": "CARGA", "H26M74002HMR": "MEMORIA", "Exynos-7904": "CPU", "PBA3-G1949": "CAM", "S612": "WIFI", "S925D2 SAT0BQ00 ": "RF", "S527S 608F27M": "POWER", "SM3010": "BACKLIGHT", "SMA1301": "AUDIO", "D5328": "PA", "114540": "PA", "W33232H": "PA", "L7E1G W9B11": "", "RN74XS1": "", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                
                "SM-A310": { "THGBMFG7C1LBAIL": "MEMORIA", "EXYNOS 7578": "CPU", "SM3004": "BACKLIGHT", "SM5504": "setor", "ET9530L": "setor", "S5M910DX01": "RF", "S2MPU03X01": "POWER", "S3FWRN5SS1": "NFC", "BCM43438KUBG": "WIFI", "HRMMAA031": "PA", "LMSWKHGP": "PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                
                "SM-A315": { "MT6768": "CPU", "KM3V6001CM": "MEMORIA", "MT6358W": "POWER", "S3NRN4VX": "NFC", "S2MU106X01": "CARGA", "SM3004B": "BACKLIGHT", "E006": "ICBL", "SMA1303": "AUDIO", "SKY77621": "PA", "LMSWKQG": "PA", "MT6177W": "EF", "MT6631N": "WIFI BT", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A320": { "S5M925DA01": "RF", "EXYNOS 7870": "CPU", "THGBMFG7C2LBAIL": "MEMORIA", "S2MU004X01": "CARGA", "STOD34JR": "LIGHT", "D5224": "PA", "WIPS115749": "PA", "S2MPU05X01": "PA", "QCA9377": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},







                "CELULAR": { "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},







                "SM-A325": { "SM3010": "BACKLIGHT", "SMA1305": "AUDIO", "MT6769V": "CPU", "IMA92-JZ266": "MEMORIA", "SM5714": "CARGA", "MT6177W": "RF", "MT6631N": "WIFI", "PXUFA": "PA", "SKY77621": "PA", "RN4VXS": "", "MT6358W": "POEWR", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-A326": { "78207": "PA", "MT6853V": "CPU", "MT6308P": "", "MT6308P": "setor", "MT6360UP": "POWER", "KM8V8001JM": "MEMORIA", "MT6308P": "", "PI3MVR": "setor", "6191": "setor", "LM36274": "BACKLIGHT", "RN4VXS": "NFC", "MT6315NP": "POWER", "SKY58081": "PA", "QM77048S": "PA", "MT6190W": "RF", "SKY77652": "RF", "MT6359VNP": "POWER", "MT6631N": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor",},

                
                "SM-A336": { "878B": "AUDIO", "QM77098B": "PA", "QM81050": "", "SM3010": "BACKLIGHT", "EXYNOS-1280": "CPU", "S2MU106X01": "CARGA", "SM5451": "CARGA", "RN4VXS": "NFC", "PBA3-G2205": "", "KM2L9001CM": "MEMORIA", "878B": "AUDIO", "QM81050": "", "SPU14P": "POWER", "SPU13P": "POWER", "SKY58083": "PA", "SHANN0N5511": "RF", "S620": "WIFI BT", "QPA5580": "PA", "9961S": "", "W22A": "", "ci": "setor",},

                
                "SM-A346": { "MT6308MP": "", "SKY58081": "PA", "MT6308MP": "", "SM3010": "BLIC", "SM5451-KS10": "", "MT6360RP": "CARGA", "PBA3-G2309": "", "KM8L9001JM": "MEMORIA", "MT6877V": "CPU", "MT6365VMW": "POWER", "S3NSN4VXS2": "setor", "MT6315FP": "", "MT63150P": "", "QM77048S": "PA", "MT6190MV": "PA", "MT6635P": "WIFI", "SKY253": "PA", "QM78207": "PA", "PBGDA": "PA", "ci": "setor", "ci": "setor",},

                "SM-A356B": { "QM77298": "PA", "SKY58083": "PA", "878B": "AUDIO", "SM3010": "BACKLIGHT", "NBYK-AAK6": "OVP", "2111-2347": "CARGA", "SM5714A": "CARGA", "878B": "AUDIO", "KM8L9001JA": "AUDIO", "EXYNOS-1380": "CPU", "E8835": "CPU", "NXP560A00": "NFC", "PBA3-G2346": "CAM PMIC", "SPU150": "POWER", "QM81050": "PA", "QM81050": "PA", "SPU16": "POWER", "S5525": "RFF", "QFM4575": "PA", "SKY253": "PA", "S6566": "WIFI",},


                "SM-A600F": { "KLMBG2JETD": "MEMORIA", "EXYNOS7870": "CHIPSET", "S2MU005X03": "POWER", "BCM43456HKUBG": "WIFI", "CS35L40": "AUDIO", "HRMMAA051": "PA", "J79-KR46A": "PA", "SKY77786-11": "PA", "S5M925DA02": "RF", "S2DOS04": "LCD LIGHT", "S515-606BG7": "POWER", "SKY13745-21": "PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A605": { "QUALCOMM-SDM450": "CPU", "KMGX60014M": "MEMORIA", "SM5708": "POWER", "TFA9872": "AUDIO", "WCN3660B": "WIFI", "LMSWKQGS": "PA", "SKY77786": "PA", "SKY77656-11": "PA", "SM3004B": "LCD", "WTR3925": "RF", "PM8953-0VV": "POWER", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A606": { "L7E1T-W9924": "setor", "PBA3-G1941": "setor", "KM3V6001CM-B705": "MEMORIA", "SM6150-101": "CPU", "NXP80T17": "NFC", "PM6150A-102": "POWER", "WCN3980-00B": "WIFI BT", "894B": "setor", "LM36274": "DISPLAY", "JRKX-ABC1": "setor", "PM6150-002": "POWER", "WSA8815-0VV": "AUDIO", "SKY77656-11": "PA", "D5328-CNL9": "PA", "SDR660-003": "PA", "SKY77786": "PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A700": { "SM5502": "CHARGER", "MSM8939": "CHIPSET", "KMR310001M-B611": "MEMORIA", "9895B": "AUDIO", "47803": "AUDIO", "GPG94": "PA", "4364": "PA", "WTR4905": "RF", "PM8916": "POWER", "STOD30TPQR": "LCD LIGHT", "WCN3660B": "WIFI", "PM6150A-102": "POWER", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A705": { "SKY77786": "PA", "WCD9370": "AUDIO", "QUALCOMM-SM5150": "CPU", "KM2V7001CM": "MEMORIA", "SMB1390-003": "CARGA", "KMAS-K7D": "CAM", "WCN3980-008": "WIFI", "PM6150-002": "POWER", "KTS1678": "CARGA", "SM3010-HLVC": "LCD LIGHT", "WPS114640-54H": "PA 3G", "D5328": "PA", "SKY13745-21": "PA", "SDR660-003": "RF", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A710": { "N5DDSS4": "NFC", "BCM47522IUB2G": "setor", "T6EU": "setor", "TH6BMFG72LBAIL": "MEMORIA", "MSM8939": "CPU", "DOS04": "LCD LIGHT", "3316": "PA", "SHANN0N928P": "RF", "S2MPU03": "POWER", "BCM43454HKUBG": "WIFI", "SM5705": "CARGA", "13747-11": "PA", "T9897B": "AUDIO", "985G50A8": "PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A715": { "WCN3980-008": "WIFI", "SM7150-100": "CHIPSET", "WCD9370": "AUDIO", "KM8V7001JA-B813": "INTERNAL STORAGE", "PCA9468B3": "setor", "S2MU106X01": "CARGA", "WCN3980-008": "WIFI", "PM7150A-102": "POWER", "PM7150-002": "POWER", "PI3WVR": "setor", "TIS2-SAM": "AUDIO", "DOS15": "LCD LIGHT", "QM58110": "PA", "QFM2801": "PA", "L8EZWO8B": "PA", "SDR660": "RF", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A7160": { "QPA4580-001": "PA", "SKY77786": "PA", "EXYNOS-980": "CPU", "NXP9468B3": "NFC", "S2MU106X01": "CARGA", "D0S15-G2006": "BACKLIGHT", "KM8V8001JM-B813": "MEMORIA", "S5800-G1952": "setor", "L5E5-W03V": "setor", "S5288-60B20C": "POWER", "TAS2-SA": "AUDIO", "S5289-60B145": "PA", "K21-230263": "setor", "SHANN0N5510-2014": "setor", "QM78077-6VXM": "PA", "S620-2008": "setor", "NXP55303": "NFC", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-A716S": { "QPA4580-001": "PA", "SKY77786": "PA", "EXYNOS-980": "CPU", "NXP9468B3": "NFC", "S2MU106X01": "POWER", "D0S15-G2006": "BACKLIGHT", "KM8V8001JM-8813": "MEMORIA", "S5800-G1952": "setor", "L5E5-W03V": "setor", "S5288-60B20C": "POWER", "TAS2-SA": "AUDIO", "S5289-60B145": "PA", "K21-230263": "setor", "SHANN0N5510-2014": "setor", "QM78077-6VXM": "PA", "S620-2008": "setor", "NXP55303": "NFC", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",}, 

                "SM-A720": { "EXYNOS-7880": "CPU", "KLMBG2JENB-B041": "MEMORIA", "S2MU004X-C": "CARGA", "HRMMAA043": "PA", "LMSWKHGS": "setor", "S5M925DA01": "RF", "S2MPU05X01": "POWER", "SEN81DSXS1": "NFC", "QCA9377-3VV": "WIFI BT", "S2DOS04": "LCD LIGHT", "TFA9896B": "AUDIO", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A725": { "TAS2-SAH": "AUDIO", "58110-V8WH": "PA", "TAS2-SAH": "AUDIO", "SM3010": "LCD LIGHT", "QUALCOMM-SM7125": "CHIPSET", "SM5440-JWYQ": "CARGA", "SM5714": "CARGA", "KM8F8001JMB813": "INTERNAL STORAGE", "TS5MP646": "CAM", "RN4VXS-NPA8NE": "setor", "PM6250": "POWER", "WCD9380-000": "AUDIO", "QFM2801": "PA", "SDR675-005": "RF", "W33232-S3C113": "setor", "QDM3870": "setor", "WCN3988-000": "WIFI", "PM6150A-102": "POWER", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A730": { "SM3004B": "BACKLIGHT", "EXYNOS-7885": "CPU", "KLMCG2KETM": "MEMORIA", "TFA9872": "AUDIO", "S2MU004X01": "CARGA", "HRMMAA051": "PA", "S5M9350X02": "RF", "D5328": "PA", "S2MPU08X01": "POWER", "SEN81RRXS1": "NFC", "S5N5C12X01": "WIFI", "SFML7E0H001": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A736": { "000-K203": "QPM6815", "PA": "setor", "CS35L40": "AUDIO", "DOS15-G2209": "LCD LIGHT", "SM5451-KS07": "CARGA", "S2MU106X01": "CARGA", "PBA3-G2216": "setor", "H9HQ21AFAMAD-213Y": "MEMORIA", "SM7325-200": "CPU", "QDM3571": "setor", "PM7325-000": "POWER", "NXPS5701": "NFC", "PM7350C-002": "POWER", "QPM6810-003": "PA", "SDR735-001": "RF", "QPM4850": "PA", "40365-282203": "setor", "ZQRBA-120240": "setor", "CS35L40": "AUDIO", "ci": "setor", "ci": "setor",},


                "SM-A750": { "PN553": "NFC", "EXYNOS-7885": "CPU", "KLMDG4UCTA": "MEMORIA", "S2MU005X03": "CARGA", "S2MPU08A01": "POWER", "SM3004B": "BACKLIGHT", "TFA9872C": "AUDIO", "SKY77786-11": "PA", "D5328-C2KD": "PA", "SKY77656-11": "PA", "S92502-S8T11W0": "RF", "S5N5C12X01": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A800": { "SHANNOX333": "MEMORIA", "AH1523N-S337YL": "MEMORIA", "MSM8939": "CPU", "KMR2W0009M": "RAM", "D0S01-26XVXD": "LCD LIGHT", "BCM47522IUB2G": "GPS", "ALC5659-GRT": "AUDIO", "77633-11": "PA", "SWFg-GPH75": "setor", "77807-4": "PA", "SHANNON928": "RF", "SM5703": "CARGA", "SHANNON533": "POWER", "600XZK-1527Hfa": "POWER", "S2MPS13-60ZVV5": "POWER", "1529NL4": "POWER", "TFA9897BUK": "AUDIO", "BCM43455HKUBG": "WIFI", "13744-11": "PA", "ci": "setor", "ci": "setor",},


                "SM-A805": { "114640": "PA", "VPEHB-370334": "PA", "CS48L33": "AUDIO", "SDR660": "RF", "SKY77786-1": "PA", "SM3010": "LCD LIGHT", "WSA8815": "AUDIO", "SMB1390": "CARGA", "KM8V7001JA": "MEMORIA", "PM7150": "POWER", "TFA9894": "AUDIO", "KTS1678BEUQ": "setor", "SKY13745-21": "PA", "PM7150A": "POWER", "WCN3998": "WIFI", "NXP80T17": "NFC", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A810": { "KLUBG4G1BE": "MEMORIA", "EXYNOS-7420": "CPU", "WM1840ECS-R": "AUDIO", "S2MPB02X01": "CAM-PMIC", "HRMMAA035": "PA", "SWUu-GSJ35": "setor", "S5M933DA03-6330": "RF", "MAX77833EWM": "POWER", "S2MPM03X01-6030": "POWER", "S2MPS15A01-603S": "POWER", "MAX98506B": "AUDIO", "SEN81DSXS1": "NFC", "BCM43455HKUBG": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-826S": { "QET5100-004": "setor", "SKY77365": "PA", "TWFA-190066": "PA", "QET5100-004": "setor", "SDX50M-003": "BASEBAND", "CS35L40": "AUDIO", "SM8150": "CPU", "K3UH6H6": "RAM", "SM3080-IFYE": "LCD LIGHT", "NXP9468B3": "setor", "3DCX0-B2D9": "setor", "KLUDG4UHDB": "MEMORIA", "MAX77705C": "CARGA", "CS35L40": "CARGA", "SEN4XS2": "setor", "PBA3-G2107": "setor", "PM8150-103": "POWER", "WCD9341-001": "AUDIO", "PM8150C": "POWER", "PM8005-002": "setor", "PMX50-001": "setor", "AFEM-9106": "PA", "SDR8150-006": "RF", "WCN3998-00N": "WIFI BT", "SDR8154-001": "RF",  "QPM4850-000": "PA", "QDM3870": "setor", "ci": "setor", "ci": "setor","ci": "setor",},


                "SM-A908": { "SDX50M": "POWER", "PM8005-002": "setor", "SDR8150": "RF", "KLUDG4UHDB": "MEMORIA", "SKY77365": "PA", "SM3010-HLVG": "BACKLIGHT", "WSA8815": "AUDIO", "3DBZ1-K6D7": "setor", "NXP9468B3": "NFC", "K3UH646": "RAM", "SM8150": "CPU", "WCD9341-001": "AUDIO", "SKY13716": "PA", "PMX50-001": "POWER", "NXP80T17": "NFC", "PM8150": "POWER", "PM8150C": "POWER", "SKY78160": "PA", "QM78062": "PA", "SDR8154": "RF", "WCN3998-00N": "WIFI",},


                "SM-A910": { "THGBMFG8C2LBAIL": "MEMORIA", "QUALCOMM MSM8976": "CPU", "OD34": "setor", "SM5705R": "CARGA", "SP7022": "setor", "N5DDSS4": "setor", "HRMMAA028": "PA 3G", "LMSWKHGR": "PA", "WTR2965": "RF", "T9897B": "AUDIO", "PM8965": "POWER", "PM8004": "POWER", "WCN3680B": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-A920": { "PN553": "NFC", "TFA9872C": "AUDIO", "S2MM005X02": "CARGA", "SM5705Q": "CARGA", "KM2V7001CM": "MEMORIA", "QUALCOMM SDM660": "CPU", "PM660A": "POWER", "S2DOS03-6075PX": "setor", "SKY77656-11": "PA", "D5328-CKKN": "PA", "SKY77786-11": "PA", "SDR660": "RF", "WCN3990": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},



                   //<---LINHA J--->

                

                "SM-J100": { "SKY77769": "PA", "RF3235": "PA", "SR3532S": "RF", "SC7727S": "CHIPSET", "H9TP32A4GDDCPR": "INTERNAL STORAGE", "BCM43438KUBG": "WIFI", "SC2723S-GSV431": "POWER", "KTD2801AECD": "LCD LIGHT", "BCM47520": "GPS", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},
                
                

                "SM-J105": { "SPREADTRUM-SC9830": "CPU", "SC2723M": "POWER", "SM5504": "CARGA", "SM5701": "CARGA", "KMFN10012M": "INTERNAL STORAGE", "SC2331S": "WIFI", "BCM47522IUB2G": "setor", "SR3593S": "RF", "042DE4": "PA 2G", "SKY77621-31": "PA 3G", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},


                "SM-J110": { "SKY77621-31": "PA", "SM5504": "CARGA", "88PM886": "POWER", "KMFJ20007M-B214": "MEMORIA", "SC9830": "CPU", "88W8777": "WIFI", "88RF858": "RF", "LMSWKDGP-G55": "PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J111": { "SC2723M": "POWER", "TC350KQF16IP": "setor", "SM5504": "CARGA", "SM5701": "CARGA", "SC9830I": "CPU", "KMFN10012M-B214": "MEMORIA", "S2DOS01": "LCD LIGHT", "SC2331": "WIFI", "S5N6420X01-V030": "GPS", "WIPS25207": "PA", "SR3593S": "RF", "v-H66": "PA", "SKY77621-31": "PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J120": { "HRMMAA031": "PA", "SC9830": "CPU", "S2MPU04": "POWER", "S2MU005X01": "POWER", "S2MU005X01": "CARGA", "KMFN10012M-B214": "MEMORIA", "BCM43438KUBG": "WIFI", "S3DOS01": "LCD LIGHT", "S5M910DX01-L630": "RF", "LMSWKHGR-H66": "PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J200": { "S910": "PA", "S5M910DX01": "PA", "LMSWKHGP-GPH65": "PA", "BCM43438KUBG": "WIFI", "KMFN10012M-B214": "MEMORIA", "EXYNOS-3475": "CPU", "BCM47522IUB2G": "GPS", "HRMMAA031": "PA", "SM5703-FRNL": "CARGA", "SM3004": "LCD LIGHT", "S2MPU04X01": "POWER", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J210F": { "SKY77621-31": "PA 3G", "SWKA": "PA 2G", "SR3593S": "setor", "SM5701": "setor", "SM5504": "setor", "KMQ310013B": "MEMORIA", "SC98301": "CPU", "BCM47522IUB2G": "GPS", "SC2723M": "POWER", "D0S01": "LCD LIGHT", "SC2331S": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J250": { "WIPS115749-25": "PA", "SFMD6X0G001": "PA", "WTR2965": "RF", "WIPS33232-01": "PA", "SM5703A": "CARGA", "MSM8917": "CPU", "KMQE60006M-B318": "MEMORIA", "PMI8937-0VV": "POWER", "QFE2101": "POWER PA", "WCN3615": "WIFI", "SM3004B": "LCD LIGHT", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J260": { "V3911": "PA", "GPH65": "PA", "SKY7851-5552": "PA", "EXYNOS-7570": "CPU", "KMFN60012M-B214": "MEMORIA", "S915-S83VF": "RF", "L6Q1J W8927": "setor", "TI8AAS3ZI LM3632A": "LIGHT E DISPLAY", "S2MPU06B 606H2ZT": "POWER", "S610": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J3119": { "26B-7F2": "PA 3G", "D5D0R": "PA 2G", "QFE2340": "PA", "WTR4905": "RF", "MSM8916": "CPU", "SM5703A": "CARGA", "KMQ310013B": "MEMORIA", "WCN3620": "WIFI", "TC350K": "TOUCHCORE", "PM8916": "POWER", "GCQW": "LED LIGHT", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J320": { "SKY77621-31": "PA", "SCF26E21": "PA", "SR3593S": "RF", "SC9830I": "CPU", "KMQN10006M-B318": "MEMORIA", "SFML6Q0H001": "PA", "SC2723M": "POWER", "S2DOS01": "LCD LIGHT", "SC2331": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J330": { "S5N5C10B01-6030": "WIFI", "KMQE60013M-B318": "MEMORIA", "EXYNOS-7570": "CPU", "SKY77656-11": "PA", "SKY77786-11": "setor", "LMSWKQGR-J98": "PA", "S5M9150X01": "RF", "S2MPU06X01": "POWER", "ISL98611": "LCD LIGHT", "TFA9896BUK": "AUDIO", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J400": { "HRMMAA043": "PA", "LMSWKHGP-GPH65": "PA", "S5M9150X01-L030": "RF", "KMQX10013M-B419": "MEMORIA", "SM3004B": "LCD LIGHT", "EXYNOS-7570": "CPU", "S2MPU06X01-6030": "POWER", "S5N5C10B01-6030": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J410F": { "MSM8917-99A": "CPU", "KMFE60012M-B214": "MEMORIA", "S2MU005X03": "CARGA", "WCN3615-0VV": "WIFI BT", "114640-544": "PA", "W33232-HD1902": "setor", "070A-K837": "setor", "TI8BC88KI": "BLIC", "91C3051": "BLIC", "PM8937-0VV": "POWER", "SKY13745-21": "PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J415": { "MSM8917": "CPU", "KMQX60013M": "MEMORIA", "S2MU005X03": "CARGA", "114640": "PA", "WTR2965-0VV": "RF", "PM8937-0VV": "POWER", "3632A": "BLIC", "77786-1": "PA", "J89-eV36E": "", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J500": { "HRPF59627BTB": "PA", "LMSWKHGP": "PA", "WTR4905": "PA", "SM5703": "CARGA", "KMQN10006M": "MEMORIA", "MSM8916": "CPU", "PM8916-0VV": "POWER", "SM3004": "BLIC", "WCN3620": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J530": { "EXYNOS-7870": "CPU", "K4EHE30": "RAM,", "KLMBG2JETD-B041": "MEMORIA", "TFA9890C": "AUDIO", "MU005X02": "CARGA", "HRMMAA051": "PA", "S5M925DA01": "RF", "LMSWKQGS": "PA", "WIPS33232-01": "PA", "S515": "POWER", "MPU05X01": "POWER", "DOS01": "BLIC", "BCM43455HKUBG": "WIFI", "WIPS33232": "PA", "SKY13745-21":"PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J600": { "KLMBG2JETD-B041": "MEMORIA", "EXYNOS-7870": "CPU", "S2MU005X03-6030": "CARGA", "BCM43436LHKUBG": "WIFI", "TFA9896BUK": "AUDIO", "SKY77656": "PA", "S5M925DA02-L330": "RF", "LMSWKQGR-J98": "PA", "ci": "setor", "S2DOS04": "BLIC", "S2MPU05X01-6030": "POWER", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J610,": { "WCN3615": "WIFI", "S2MU005X03-6030": "CARGA", "KMRH60014A-B614": "MEMORIA", "MSM8917": "CPU", "WIPS114640-23": "PA", "LMSWKQGR-J98": "PA", "SKY77786-11": "PA", "WTR2965": "RF", "PM8937": "POWER", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J700": { "SKY77633-11": "PA", "LMSWKHGP-GPH65": "PA", "SHANNON918 W1606HBE": "setor", "SM5703A": "CARGA", "THGBMFG7C2LBAIL": "MEMORIA", "Exynos-7580": "CPU", "S2MPU03A": "POWER", "BCM43438KUBG": "WIFI", "S2DOS01": "LCD LIGHT", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J701": { "HRMMAA051": "PA 3G", "LMSWKQGR-J98": "PA 2G", "S2MU005X03-6030": "CARGA", "EXYNOS-7870": "CPU", "KLMAG1JETD": "MEMORIA", "S5M925DA01-L330": "RF", "13746-21": "PA", "ABA-53HF": "setor", "S515": "POWER", "D0S01": "LCD LIGHT", "BCM43438KUBG": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J710": { "SKY77912-21": "PA", "SKY77652-11": "PA", "SKY77651-21": "PA", "S5M925DA01-L330": "RF", "KLAMAG1JENB-B031": "MEMORIA", "MSM8952": "CPU", "SM3004": "LCD LIGHT", "S3NR80XS1-YT30": "NFC", "S515": "POWER", "S2MPU05X01": "POWER", "S2MU005X01": "CARGA", "BCM43438KUBG": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},
                "CELULAR": { "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J720": { "SKY77656-11": "PA 3G", "RN34A": "PA", "S915": "RF", "SKY77786-1": "PA", "S2MU005X03": "CARGA", "EXYNOS-7885": "CPU", "KLMBG2JETD": "MEMORIA", "872C": "AUDIO", "S527B": "POWER", "D0S04": "LCD LIGHT", "S612": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J730": { "EXYNOS-7870": "CPU", "K4EHE30": "RAM", "KML7U000HM-B505": "MEMORIA", "HRMMAA051": "PA", "CG92A": "PA", "LMSWKQGS": "PA", "S5M925DA01-L030": "RF", "WIPS33232-01": "PA", "S515": "POWER", "S2MPU05X01": "POWER", "SM3004B": "LCD LIGHT", "BCM43455HKUBG": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                "SM-J810": { "SDM450": "CPU", "KMRH60014A-B614": "MEMORIA", "SM5708": "CARGA", "WCN3615": "WIFI", "SKY77656-11": "PA", "NT69B": "PA", "LMSWKQGS": "PA", "SKY77786-11": "PA", "WTR3925-2": "RF", "SM3004B": "LCD LIGHT", "PM8953": "POWER", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                
                 //LINHA M//


                 "SM-M015": { "KMGD6001BM-B421": "MEMORIA", "SDM439": "CPU", "K318": "AUDIO", "AW9961DNR": "LCD LIGHT", "SKY7219M-71": "PA 3G", "WTR2965": "RF", "PMI632-502": "POWER", "AP6716M-61": "PA 2G", "WCN3615-0VV": "WIFI", "PM439-0VV": "POWER", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M022": { "BLIC": "DISPLAY", "LM36273": "DISPLAY", "AW8896": "AUDIO", "MT6739V": "CPU", "KMQX60013A-B419": "NMEMORIA", "S2MU005X03": "CARGA", "MT6357V": "POWER", "SKY77621-31": "PA 3G", "MT6625LN": "WIFI", "MT6177MV": "RF", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M105": { "EXYNOS-7870": "CPU", "K4E6E304EC": "RAM", "TI93C8W21-3632A": "LCD LIGHT", "LM3632AYFFR": "LCD LIGHT", "KLMAG1JETD-8041": "MEMORIA", "S515": "POWER", "9896B": "AUDIO", "W33232": "PA", "SWKa-GPH65": "PA", "043-3223": "PA", "S925D": "RF", "BCM43436LH": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M115": { "56030-66AB": "PA 3G", "PMI632-902": "CARGA", "AW9961DNR": "LCD LIGHT", "KMGX6001BA": "MEMORIA", "SDM450": "CPU", "WCN3615-0VV": "WIFI", "RF5212A": "PA 2G", "WTR2965-0VV": "RF", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M125": { "LM36274": "DISPLAY", "SMA1303": "AUDIO", "MT6765V": "CPU", "KM3V6001CA-B708": "MEMORIA", "SM5714-JUYR": "CARGA", "MT6357CRV": "POWER", "SKY77621-31": "PA 3G", "W33232": "PA", "MT6631N-2122": "WIFI", "MT6177MV-2117": "RF", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M127": { "LM36274": "DISPLAY", "AW8896-QDC111": "AUDIO", "EXYNOS-850": "CPU", "KMDP6001DB-B425": "MEMORIA", "SM5714-JU05": "CARGA", "PI3WVR-648GEAE": "setor", "GWZC-J150": "setor", "S518-60GW37": "POWER", "SKY77656-11": "PA", "S915-SGAR6": "seRFtor", "D3L6-W1C7": "setor", "W33232-PP2142": "setor", "S612-W2149": "WIFI E BT", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M205": { "EXYNOS-7904": "CPU", "K4FHE3D": "RAM", "S2MU004X-C": "CARGA", "EXYNOS-7904": "CPU", "K4FHE3D": "RAM", "S2MU004X-C": "CARGA", "S527S": "POWER", "SDINBDG4-32G": "MEMORIA", "SKY77656-11": "PA", "J98-HYNDA": "setor", "S915": "RF", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M215": { "D0S15-G1938": "LCD LIGHT", "EXYNOS-9611": "CPU", "ALC5665": "AUDIO", "SKY13745-21": "PA", "S537-609NB4": "POWER", "SM5713": "CARGA", "ET9539AM": "setor", "D88E-W05K": "PA", "114640-545": "3G PA", "S915-SB4CX": "RF", "SKY77786-1": "2G PA", "S620": "WIFI", "KLUDG4J1ED-B0C1": "MEMORIA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M225": { "SM3010": "lcd light", "AW8896": "audio", "MT6769V": "cpu", "KMDH6001DA": "memoria", "SM5714": "carga", "NXP9468B3": "nfc", "TS5MP646": "CAM", "NXP55701": "NFC", "MT6358W": "POWER", "115749-2": "PA", "W33232": "PA", "D3LB": "PA", "MT6177W": "RF", "MT6631N": "WIFI", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M236": { "WCD9380-000": "AUDIO", "E211": "setor", "QET6105": "setor", "SKY58083-11": "PA", "KTZ8864BEJAA": "DISPLAY", "878B": "AUDIO", "TFA9878BUK": "AUDIO", "SM7225-200": "CPU", "ET9523CL": "setor", "SM5451-KS0P": "CARGA", "SM5714-A9A8": "CARGA", "KM5L9001DM-B518": "MEMORIA", "PBA3": "CAM PMIC", "S2MPB03X01": "CAM PMIC", "SFML5E0K001": "setor", "LMSWLAGN-L15": "RF", "NXP55701": "NFC", "PM6350-000": "POWER", "PM6150A-102": "POWER", "SDR735-001": "POWER", "QM77098": "PA",},
                 

                 "SM-M305": { "TFA9896BUK": "AUDIO", "EXYNOS-7904": "CPU", "SM3010": "LCD LIGHT", "L7E15": "PA", "SFML7E0H001": "PA", "S527S-S5E7904": "POWER", "S2MU106X01": "CARGA", "MfJFA": "PA", "LMSWKQGR-J98": "PA", "SKY77656-11": "PA", "S5M9150X01-L030": "RF", "WIPS33232-01": "PA", "S5N5C12X01-6630": "WIFI", "KLMCG2UCTA-B041": "MEMORIA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M307": { "ALC5665": "AUDIO", "SKY13745-21": "PA", "D0S15-G1938": "LCD LIGHT", "EXYNOS-9611": "CPU", "KLUCG4U1ED-B0C1": "MEMORIA", "S537-609NB4": "POWER", "SM5713-HFWH": "CARGA", "ET9539AM": "setor", "S915-SA4RN": "RF", "114640-545": "PA 3G", "D8BE-W05K": "PA", "S620": "WIFI", "SKY77786-1": "2G PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M315": { "EXYNOS-9611": "CPU", "DOS15": "LCD LIGHT", "ALC5665": "AUDIO", "L7EOD-WO314": "PA", "S537-60995P": "POWER", "SM5713-HFWA": "CARGA", "300092-J98": "PA", "SKY77656-11": "PA", "S915-SB1HZ": "RF", "SKY77786-1": "PA", "S620-W2005": "WIFI", "MICRON-OCA22": "MEMORIA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M317": { "BB234": "setor", "EXYNOS-9611": "CPU", "SM3010": "LCD LIGHT", "SM5440": "setor", "S2MU106X01": "CARGA", "0EA22-JZI44": "MEMORIA", "PBA3": "setor", "S537-609NKN": "POWER", "ALC5665": "AUDIO", "SKY77656-11": "PA", "FUKHA-020521": "setor", "S915": "RF", "W33232": "PA", "S620-W2031": "WIFI", "ABA-B67H": "setor", "L7EO5-WO817": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M325": { "SM3010": "LCD LIGHT", "AW8896": "AUDIO", "MT6769V": "CPU", "KMDH6001DA": "MEMORIA", "SM5714": "CARGA", "NXP9468B3": "setor", "TS5MP646": "CAM", "NXP55701": "NFC", "MT6358W": "POWER", "115749-2": "PA", "W33232": "setor", "D3LB": "setor", "MT6177W": "RF", "MT6631N": "WIFI E BT", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M336": { "KM2L9001CM-B518": "MEMORIA", "QM81050-0MKV": "setor", "SKY58083-11": "PA", "QM81050-0MKV": "setor", "LWRW-BUAR": "DISPLAY E BACKLIGHT", "878B-2121": "AUDIO", "E8825": "CPU", "EXYNOS-1280": "CPU", "ALC5665-GL51C": "AUDIO", "SM5451-K506": "CARGA", "SM5714-JU0D": "CARGA", "PBA3-G2208": "CAM", "NXP55701-SSD137": "NFC", "L5E8-W225": "setor", "SPU13P-60HGFX": "POWER", "SPU14P-60HR36": "POWER", "SHANN0N5511-2149": "RF", "QM77098B-1CGXM": "PA", "S101276-M2HU1C": "setor", "S620": "setor", "SKY77652-31": "PA","RPSGA-220369": "PA",},

                 "SM-M515": { "WCD9370": "AUDIO", "DOS15": "LCD LIGHT", "SM7150": "CPU", "KM8V7001JA": "MEMORIA", "PCA9468": "setor", "S2MU106X01": "POWER", "WCN3980": "WIFI E BT", "PM7150A": "POWER", "WSA8815": "AUDIO", "PI3WVR": "setor", "SKY77656-11": "PA", "LMSWKQGR-J98": "PA", "PM7150A": "POWER", "SDR660": "RF", "W33232": "setor", "L7EOM-WOA23": "setor", "RN4VXS": "NFC", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M526": { "878B": "AUDIO", "SM3010": "LCD LIGHT", "SM7325-200": "CPU", "KM8V8001JM-B813": "MEMORIA", "ET9523CL": "setor", "NXP9468B3": "NFC", "SM5714-JU0B": "CARGA", "E140-000": "setor", "WCD9380-000": "AUDIO", "LHT03-W1B24": "setor", "PM7350C-002": "POWER", "PBA3-G2139": "CAM", "PM7325-000": "POWER", "SDR735-001": "RF", "SKY58083-11": "PA", "QPM6815-003": "PA", "WCN6750-001": "WIFI E BT", "33253H5": "setor", "S113542-L9FU1B": "setor", "ci": "setor", "ci": "setor",},

                 "SM-M546B": { "878B": "AUDIO", "SKY58083-11": "PA", "QM81050": "setor", "D0SI5-G2324": "LCD LIGHT", "E8835": "CPU", "EXYNOS-1380": "CPU", "SM5451-KS2T": "CARGA", "SM5714-JU2P": "CARGA", "21NFCJ-A92D52": "NFC", "KM8F9001JM-B813": "MEMORIA", "PBA3-G2332": "CAM", "L6ZA-W3AU": "PA", "140016": "PA", "SKY77652-31": "PA", "1Z15": "AUDIO", "SPU150-60R8PG": "POWER", "SPU16-60PGTP": "POWER", "QM81050": "setor", "S5525-2326": "RF", "QPM6815-003": "PA", "SKY8267-11": "PA", "S6566-W2346": "WIFI E BT",},

                 "SM-M625": { "CS47L93": "AUDIO", "SM3010": "LCD LIGHT", "CS35L40": "AUDIO", "KLUDG4UHDB": "MEMORIA", "NXP9468B3": "NFC", "MAX77705C": "CARGA", "PI3WVR": "setor", "LHTON-WOB25": "setor", "S5201-60B6P31": "setor", "K3UHH6H6": "RAM", "EXYNOS-9825": "CPU", "BB209-0D8Z8": "setor", "RN4VXS": "NFC", "3ZCF1-B9DS": "setor", "S5200": "POWER", "58110": "PA", "QFM4802": "PA", "SHANN0N5500": "RF", "2851C3-L318J5": "WIFI E BT", "BCM47755B1KU": "GPS", "ci": "setor",},

                


                 






            },








            "XIAOMI": {
               "MI 10 5G": { "SDR865": "RF", "KLUDG4UHDB-B2D1": "MEMORIA", "PM8150A": "POWER", "K3LK3K3": "RAM", "SM8250": "CPU", "PM8009": "POWER", "CS35L41B-CWZR": "AUDIO", "SDX55M": "BASEBAND", "PMX55": "POWER BB", "BQ25970": "CARGA", "QM7033D": "PA", "QM77040": "PA", "QPA5581": "PA", "CS35L41B-CWZR": "AUDIO", "PM8250": "POWER", "QCA6391": "WIFI", "NXP8101H": "setor", "NXP8101C": "setor", "WCD9380": "AUDIO",},

               "MI 10 LITE 5G": { "0X0-943": "setor", "SDR865-005": "RF", "QPM5677": "PA", "6110-001": "RF", "6110-001": "RF", "QET6100-002": "setor", "SMB1395-001": "CARGA", "H9HQ15AECMAD": "MEMORIA", "CS35L41B": "AUDIO", "WCN3998": "WIFI E BT", "SM7250": "CHIPSET", "WCD9380": "AUDIO", "I4607-P49AB1": "setor", "NXP100TB28": "NFC", "PM7150A-102": "POWER", "SM3010B": "LCD LIGHT", "PM7250B-000": "CARGA", "PM7250-003": "POWER", "77040": "PA",},

               " MI 10 PRO 5G": { "SDR865-005": "RF", "KLUDG4UHDB-B2D1": "MEMORIA", "PM8150A": "POWER", "K3LK3K3": "RAM", "SM8250": "CHIPSET", "PM8009": "POWER", "CS35L41B-CWZR": "AUDIO", "SDX55M": "BASEBAND", "PMX55": "POWER BB", "BQ25970": "CARGA", "QM7033D": "PA", "QM77040": "PA", "QPA5581": "PA", "QDM2310": "PA", "CS35L41B-CWZR": "AUDIO", "PM8250": "POWER", "QCA6391-002": "WIFI E BT", "NXP8101H": "setor", "NXP8101C": "setor",},

               " MI 10 YOUTH 5G": { "SDR865-005": "RF", "QPM5677": "PA", "6110-001": "RF", "6110-001": "RF", "QET6100-002": "setor", "SMB1395-001": "CARGA", "H9HQ15AECMAD": "MEMORIA", "CS35L41B": "AUDIO", "WCN3998": "WIFI E BT", "SM7250": "CHIPSET", "WCD9380": "AUDIO", "I4607-P49AB1": "setor", "NXP100TB28": "NFC", "0X0-943": "setor", "PM7150A-102": "POWER", "SM3010B": "LCD LIGHT", "PM7250B-000": "CARGA", "PM7250-003": "POWER", "QM77040": "PA",},

               " MI 10T PRO": { "SN100T": "NFC", "QPM5677": "PA", "QLN5040": "PA", "SDR865": "RF", "SDX55M-002": "BASEBAND", "QDM2310": "PA", "QET6100": "setor", "QM77033D": "PA", "QET5100": "setor", "BQ25968": "setor", "PM8150B-102": "setor", "AW8697FCR": "AUDIO", "SDINEDK4-256G": "MEMORIA", "SM8250": "CHIPSET", "PM8150L": "POWER", "QM42391": "PA", "QM45391": "PA", "QCA6391": "WIFI E BT", "WCD9380": "AUDIO", "CS35L41B": "AUDIO", "FSA4480UCX": "setor", "6D19": "setor", "PM8250-003": "POWER", "5020": "PA", "QLN5020": "PA", "QM77040": "PA", "5020": "PA", "QLN5040": "PA", "QPA5581-000": "PA", "QPM5677-001": "PA", "CS35L41B": "AUDIO", "PMX55-001": "POWER PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor"},

               " MI10T": { "SN100T": "NFC", "QPM5677-001": "PA", "5040": "PA", "QLN5040": "PA", "SDR865": "RF", "SDX55M-002": "BASEBAND", "QDM2310": "PA", "QET6100": "setor", "QM77033D-8JGY": "PA", "QET5100": "setor", "BQ25968": "CARGA", "PM8150B-102": "POWER", "QESG": "AUDIO", "AW8697FCR": "AUDIO", "SDINEDK4-256G": "MEMORIA", "SM8250": "CHIPSET", "PM8150L-103": "POWER", "QM42391": "PA", "QM45391": "PA","QCA6391-002": "wifi e bt", "WCD9380": "audio", "CS35L41B": "audio", "6D19": "setor", "FSA4480UCX": "setor", "PM8250-003": "power", "5020": "pa", "QLN5020": "pa", "QM77040": "pa","5040": "pa", "QLN5040": "pa", "QPA5581-000": "pa", "QPM5677-001": "pa", "CS35L41B": "audio", "PMX55-001": "power bb", "ci": "setor", "ci": "setor", "ci": "setor","ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               " MI 10I 5G": { "QPM5579-001": "PA", "QDM2310": "PA", "P34AA1-2039": "setor", "QET5100-004": "setor", "SMB1395-001": "CARGA", "H9HQ15AECMAD-047Y": "MEMORIA", "WCD9375-001": "AUDIO", "WCN3991-00T": "WIFI E BT", "SM7225-000": "CHIPSET", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               " MI 11 LITE 5G": { "1G1": "PA", "QDM5577": "PA", "QPM5577-002": "PA", "KM8V9001JM-B813": "MEMORIA", "SDR735-001": "RF", "5030": "setor", "QLN5030": "setor", "QDM2310": "PA", "QM77040-B32S": "PA", "50372S": "LCD LIGHT", "NT50372S": "LCD LIGHT", "WCD9380-000": "AUDIO", "PM7325B-201": "POWER", "873E": "AUDIO", "TFA9873EUK": "AUDIO", "R13N03": "setor", "EMR13N03M": "setor", "SC8551A-6G640": "CARGA", "WCN6750-001": "WIFI E BT","SM7325-200": "CHIPSET", "1G1": "PA", "QDM5577": "PA", "K37LA1": "setor", "ICM-40607": "setor", "AW8624CSR": "AUDIO", "OXO-121": "setor", "873E": "AUDIO", "TFA9873EUK": "AUDIO", "PM7350C-002": "POWER", "HL5280": "AUDIO", "DIO4480": "AUDIO", "QET5100-004": "POWER PA", "SKY58091-21": "PA", "PM7325-000": "POWER", "5030": "setor", "QLN5030": "setor", "QET5100-004": "POWER PA","QPA5581-000": "PA", "NXP100TB28": "NFC", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               " MI 11 LITE": { "SDR660": "RF", "WCD9375": "AUDIO", "SM7150-100": "CHIPSET", "ET748-CX420": "setor", "BQ25968": "setor", "WCN3980": "WIFI E BT", "H9HQ15AFAMBD": "MEMORIA", "PM7150A-102": "POWER", "NXP55303": "NFC", "873E": "AUDIO", "PM7150": "POWER", "RF5228A": "PA", "VC7643": "PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               " MI 11 PRO": { "SDR868-008": "RF", "QDM2310": "PA", "QPM5677-001": "PA", "K3LK7K7": "RAM", "SM8350": "CHIPSET", "QPM5679-001": "PA", "BQ25970": "CARGA", "LN8620-0106": "setor", "LN8620-0106": "setor", "BQ25970": "CARGA", "QPM5677-001": "PA", "PM8350BH-001": "POWER", "QM42391-AKYS": "PA", "WCN6851-102": "WIFI E BT", "WCD9380-000": "AUDIO", "HN8T05BZGK-110A": "MEMORIA", "45392-9D7C": "setor", "1651-2116": "setor", "6D70-B3P2": "setor","ci": "setor", "PM8350": "POWER", "QET6100-002": "setor", "6110-001": "setor", "PM8350C": "POWER", "PMR735A": "POWER", "NXP100TB28": "NFC","CS35L41B": "AUDIO", "SKY58091-21": "PA","QM77040-9Z9J": "PA", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "MI 11": { "CS35L41B": "AUDIO", "WCN6851-102": "WIFI E BT", "SDR868": "RF", "QDM2310": "PA 5G", "QET6110": "setor", "QET6100": "setor", "QM77033D": "PA", "HN8T15BZGK": "MEMORIA", "SMB1396-002": "setor", "1619A": "setor", "NU1619AWFFB": "setor", "SMB1396": "setor", "AW8697FCR": "setor", "SM8350": "CPU", "K3LK7K7": "RAM", "NXP100TB28": "NFC", "PMR735A-005": "setor", "PM8350": "POWER", "WCD9380": "AUDIO", "SM3010B": "BACKLIGHT", "LN8282": "setor", "FSA4480UCX": "setor", "PM8350C-004": "POWER", "PM8350BH": "POWER", "QM77040": "PA", "QPM5679": "PA", "QPM5677": "PA", "QPA5581": "PA", "QM25032": "setor",},

               "MI11 ULTRA": { "SDR868-008": "RF", "QDM2310": "PA", "QPM5677-001": "PA", "SM8350": "CHIPSET", "K3LK4K4": "RAM", "QPM5679": "PA", "BQ25968": "setor", "LN8620-0027": "setor", "BQ25968": "setor", "QPM5677": "PA", "PM8350BH": "POWER", "QM42391": "PA", "WCN6851": "WIFI BT", "WCD9380": "AUDIO", "KLUDG4UHDB-B2D1": "MEMORIA", "QM45392": "RF", "NU1651WYYB": "WIRELLES CHARGER", "6D18": "setor", "FSA4480UCX": "setor", "PM8350": "POWER", "6110": "setor", "QET6110": "setor", "QET6100-002": "setor", "6110": "setor", "QET6110": "setor", "PMR735A": "setor", "CS35L41B": "AUDIO", "NXP100TB28": "NFC", "SN100T": "NFC", "QM77040": "PA", "SKY58091-21": "PA",},

               "MI 11T": { "MT6308HP-2121": "setor", "A72341-01": "setor", "HL7593WA": "OVP", "SKY8258-21": "setor", "CS35L41B-B2PL2126": "AUDIO", "83K5A-RRQAY": "setor", "QDM2310": "PA", "MT6190W-2134": "RF", "SKY58081-11": "PA", "MT6308HP-2121": "setor", "Dimensity 1200": "CPU", "K3UH7H70BN": "RAM", "LN8000-0084": "setor", "CS35L41B": "AUDIO", "HN8T15BZGK": "MEMORIA", "HL7593W7": "OVP", "MT6635XP-2137": "WIFI BT", "MT6315GP-2140": "POWER", "2M430": "setor", "MT63158P-2138": "setor", "50372S-1KEAG": "BACKLIGHT", "QM77048B": "PA", "MT6315RP": "POWER", "MT6360PP-2134": "POWER", "Vc7643-2125": "PA", "MT6359VPP": "POWER", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "MI 11T PRO": { "SDR868-008": "RF", "5030-002": "setor", "QDM2310": "PA", "QET5100-004": "PA", "SKY58081-11": "PA", "SMB1396-002": "setor", "SMB1399-001": "CARGA", "78-653B0": "setor", "SMB1396-002": "setor", "CS35L41B": "AUDIO", "SM8350": "CPU", "K3LK4K4": "RAM", "KLUEG8UHDC": "MEMORIA", "NXP8101H": "setor", "NXP8101C": "setor", "WCN6851-102": "WIFI BT", "WCD9380-000": "AUDIO", "PM8350C-004": "POWER", "PM8350BHS": "CARGA", "77048B-C83Z": "setor", "PM8350-001": "setor", "VC7643": "PA", "CS35L41B": "AUDIO", "QPM557-002": "PA", "NXP100TB28": "NFC",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

               "CELULAR": { "2222": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor", "ci": "setor",},

              },
         
        
         
        };

        // Função para verificar se o link termina com '.pdf'
        function verificarLink(event) {
            const link = event.target;
            const href = link.getAttribute("href");

            if (href && href.endsWith("bci.pdf")) {
                // Exibe o container de busca e o resultado quando o link de PDF for clicado
                document.querySelector(".search-container").style.display = "inline-block"; 
                document.querySelector("#resultado").style.display = "none"; // Garante que o resultado esteja oculto inicialmente
            }
        }

        // Adiciona o evento de clique a todos os links na página
        document.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", verificarLink);
        });

        function buscarCI() {
          const ciDigitado = document.getElementById("ciInput").value.toLowerCase();
          const resultadoDiv = document.getElementById("resultado");
          resultadoDiv.innerHTML = "";
      
            // 👉 Oculta o resultado se o campo estiver vazio
  if (ciDigitado === "") {
    resultadoDiv.style.display = "none";
    return;
  }
      
          let encontrados = [];
          for (let marca in celulares) {
              for (let modelo in celulares[marca]) {
                  for (let ci in celulares[marca][modelo]) {
                      if (ci.toLowerCase().includes(ciDigitado)) { // Busca parcial e sem diferenciar maiúsculas/minúsculas
                          encontrados.push(`<tr><td>${marca}</td><td>${modelo}</td><td>${ci}</td><td>${celulares[marca][modelo][ci]}</td></tr>`);
                      }
                  }
              }
          }
      
          if (encontrados.length) {
              resultadoDiv.innerHTML = `<table>
                  <tr><th>Marca</th><th>Modelo</th><th>CI</th><th>Função</th></tr>
                  ${encontrados.join("")}
              </table>`;
              resultadoDiv.style.display = "block"; // Exibe o resultado após a busca
          } else {
              resultadoDiv.innerHTML = "<p>NÃO ENCONTRADO...</p><br><p>VERIFIQUE O CI E TENTE NOVAMENTE</p>";
              resultadoDiv.style.display = "block"; // Exibe a mensagem de "nenhum modelo encontrado"
          }
      }
      
      
        // Função para ocultar o container de busca e o resultado
        function ocultarContainer() {
          
            document.querySelector(".search-container").style.display = "none";
            document.querySelector("#resultado").style.display = "none"; // Oculta o resultado também
        }

       document.addEventListener('DOMContentLoaded', function() {
  // loadUserWatermark(); // comente para testar se não existir

  document.getElementById('toggleExpand').addEventListener('click', function() {
    const tabContainer = document.getElementById('tabContainer');
    const currentMargin = window.getComputedStyle(tabContainer).marginLeft;
    if (currentMargin === '0px') {
      tabContainer.style.marginLeft = '250px';
    } else {
      tabContainer.style.marginLeft = '0px';
    }
  });
});
