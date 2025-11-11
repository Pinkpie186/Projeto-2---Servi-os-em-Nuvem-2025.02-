# 🛰️ Projeto Integrador – Cloud Developing 2025/1

> CRUD simples + API Gateway + Lambda /report + RDS + CI/CD  
> Tema: **Monitoramento de Sensores (IoT Basic)**

---

## 👥 Grupo
1. 10401908 - Giulia Barros Gondim - Backend e integração com RDS  
2. 10416808 - Gabriel Bello - Configuração AWS ECS e API Gateway  


---

## 1. 🎯 Visão Geral
O projeto **Monitoramento de Sensores (IoT Basic)** permite cadastrar, listar, atualizar e remover sensores IoT. Cada sensor possui: ID, nome, tipo, valor e data da última leitura.  
A aplicação roda em **ECS Fargate**, utilizando **RDS MySQL privado**, **API Gateway** para expor as rotas e **Lambda** para gerar relatórios estatísticos `/report`.  

---

## 2. 🏗️ Arquitetura

```mermaid
flowchart TD
    %% === CAMADA DE DESENVOLVIMENTO ===
    subgraph Dev[Ambiente de Desenvolvimento]
        G[Desenvolvedores\nGiulia e Gabriel]
        GH[GitHub - Repositório do Código]
        G -->|Commit & Push| GH
    end

    %% === PIPELINE CI/CD ===
    subgraph CI[Pipeline CI/CD]
        A1[GitHub Actions ou AWS CodePipeline]
        A2[Build da Imagem Docker]
        A3[ECR - Elastic Container Registry]
        A4[Deploy Automático no ECS Fargate]

        GH -->|Disparo do Workflow| A1
        A1 --> A2
        A2 -->|Push da Imagem| A3
        A3 --> A4
    end

    %% === ARQUITETURA AWS ===
    subgraph AWS[Infraestrutura AWS Cloud]
        AGW[Amazon API Gateway]
        ECS[ECS Fargate - Backend Containerizado]
        LMB[AWS Lambda - Função project2-report]
        RDS[(Amazon Aurora PostgreSQL - Banco de Dados)]
        CW[Amazon CloudWatch - Logs e Monitoramento]
    end

    %% === INTERAÇÃO DE USUÁRIO ===
    U[Usuário] -->|Requisições HTTP| AGW

    %% === FLUXO DE DADOS ===
    AGW -->|Rotas CRUD| ECS
    AGW -->|Rota /report| LMB
    ECS -->|Consultas SQL| RDS
    ECS <-->|Dados de Sensores| RDS

    %% === MONITORAMENTO ===
    ECS -->|Logs e Métricas| CW
    LMB -->|Logs de Execução| CW

    %% === INTEGRAÇÃO CI/CD COM AWS ===
    A4 --> ECS

    %% === ESTILIZAÇÃO ===
    style U fill:#f4f4f4,stroke:#999,stroke-width:1px
    style GH fill:#333,stroke:#000,color:#fff
    style G fill:#f9f9f9,stroke:#666
    style A1 fill:#6cc644,stroke:#4a993d,color:#fff
    style A2 fill:#6cc644,stroke:#4a993d,color:#fff
    style A3 fill:#232f3e,stroke:#111,color:#fff
    style A4 fill:#232f3e,stroke:#111,color:#fff
    style AGW fill:#FF9900,stroke:#cc7a00,color:#fff
    style ECS fill:#146eb4,stroke:#0d4f87,color:#fff
    style LMB fill:#4b9e3d,stroke:#2e6d25,color:#fff
    style RDS fill:#0073bb,stroke:#004d80,color:#fff
    style CW fill:#ffcc00,stroke:#b38f00,color:#000
```

| Camada    | Serviço             | Descrição |
|-----------|-------------------|-----------|
| Backend   | ECS Fargate        | API REST Node.js conectada ao RDS MySQL |
| Banco     | Amazon RDS         | MySQL em subnet privada |
| Gateway   | API Gateway        | Rotas CRUD → ECS · `/report` → Lambda |
| Função    | AWS Lambda         | Consome a API via HTTP e gera estatísticas JSON |
| CI/CD     | CodePipeline + GitHub | Push → Build → ECR → Deploy ECS |

---

## 3. 🚀 Como rodar localmente

```bash
cp .env.example .env
docker compose up --build
# API em http://localhost:3000
