// Script para configurar automaticamente o bearer token no Swagger após o login
(function() {
  'use strict';

  console.log('🔧 Script de auto-autenticação do Swagger iniciando...');

  // Função para configurar o token no Swagger UI
  function setBearerToken(token) {
    console.log('🔑 Tentando configurar token no Swagger UI...');
    
    // Aguarda o Swagger UI estar completamente carregado
    let attempts = 0;
    const maxAttempts = 100; // 10 segundos
    
    const checkSwaggerUI = setInterval(() => {
      attempts++;
      
      if (window.ui && typeof window.ui.getSystem === 'function') {
        clearInterval(checkSwaggerUI);
        
        try {
          const system = window.ui.getSystem();
          const authActions = system.authActions;
          
          if (authActions && typeof authActions.authorize === 'function') {
            // Configura o token usando a API do Swagger UI
            authActions.authorize({
              bearer: {
                name: 'bearer',
                schema: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT'
                },
                value: token
              }
            });
            
            console.log('✅ Bearer token configurado automaticamente no Swagger!');
            
            // Também salva no localStorage para persistência
            try {
              const authData = {
                bearer: {
                  name: 'bearer',
                  schema: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                  },
                  value: token
                }
              };
              localStorage.setItem('swagger-ui-auth', JSON.stringify(authData));
            } catch (e) {
              console.warn('Não foi possível salvar no localStorage:', e);
            }
          } else {
            console.warn('authActions não encontrado ou authorize não é uma função');
          }
        } catch (err) {
          console.error('Erro ao configurar token no Swagger:', err);
        }
      } else if (attempts >= maxAttempts) {
        clearInterval(checkSwaggerUI);
        console.warn('⚠️ Swagger UI não encontrado após 10 segundos');
      }
    }, 100);
  }

  // Intercepta requisições fetch
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const url = args[0];
    const urlString = typeof url === 'string' ? url : (url && url.url ? url.url : '');
    
    // Verifica se é uma requisição para o endpoint de login
    if (urlString && urlString.includes('/api/v1/auth/login')) {
      console.log('🔍 Interceptando requisição de login...');
      
      return originalFetch.apply(this, args).then(response => {
        // Clona a resposta para poder ler o body
        const clonedResponse = response.clone();
        
        clonedResponse.json().then(data => {
          console.log('📦 Resposta do login recebida:', data);
          if (data && data.access_token) {
            console.log('🎯 Token encontrado, configurando...');
            setBearerToken(data.access_token);
          } else {
            console.warn('⚠️ access_token não encontrado na resposta');
          }
        }).catch(err => {
          console.warn('⚠️ Erro ao processar resposta do login:', err);
        });
        
        return response;
      }).catch(err => {
        console.error('❌ Erro na requisição fetch:', err);
        return originalFetch.apply(this, args);
      });
    }
    
    return originalFetch.apply(this, args);
  };

  // Intercepta requisições XMLHttpRequest (usado pelo Swagger UI)
  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;
  
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    this._swaggerUrl = url;
    return originalXHROpen.apply(this, [method, url, ...rest]);
  };
  
  XMLHttpRequest.prototype.send = function(...args) {
    if (this._swaggerUrl && this._swaggerUrl.includes('/api/v1/auth/login')) {
      console.log('🔍 Interceptando requisição XHR de login...');
      
      this.addEventListener('load', function() {
        if (this.status >= 200 && this.status < 300) {
          try {
            const data = JSON.parse(this.responseText);
            console.log('📦 Resposta do login recebida (XHR):', data);
            if (data && data.access_token) {
              console.log('🎯 Token encontrado, configurando...');
              setBearerToken(data.access_token);
            } else {
              console.warn('⚠️ access_token não encontrado na resposta');
            }
          } catch (err) {
            console.warn('⚠️ Erro ao processar resposta do login (XHR):', err);
          }
        } else {
          console.warn('⚠️ Resposta do login com status:', this.status);
        }
      });
    }
    return originalXHRSend.apply(this, args);
  };

  // Aguarda o DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('📄 DOM carregado, script de auto-autenticação ativo');
    });
  } else {
    console.log('📄 DOM já carregado, script de auto-autenticação ativo');
  }
})();

