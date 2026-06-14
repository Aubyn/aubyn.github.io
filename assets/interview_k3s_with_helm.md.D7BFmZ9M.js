import{l as a,a as n,c as i,a6 as p}from"./chunks/framework.BlM2IGSi.js";const c=JSON.parse('{"title":"k3s + helm 协作","description":"","frontmatter":{},"headers":[],"relativePath":"interview/k3s_with_helm.md","filePath":"interview/k3s_with_helm.md"}'),l={name:"interview/k3s_with_helm.md"};function t(e,s,h,r,k,d){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="k3s-helm-协作" tabindex="-1">k3s + helm 协作 <a class="header-anchor" href="#k3s-helm-协作" aria-label="Permalink to &quot;k3s + helm 协作&quot;">​</a></h1><p>以下从全局视角，通过 <strong>6 个问题</strong> 由浅入深地梳理 k3s 与 Helm 的核心概念、协作关系，以及两种部署模式的完整流程。</p><hr><h2 id="问题-1-k3s-中有哪些核心概念" tabindex="-1">问题 1：k3s 中有哪些核心概念？ <a class="header-anchor" href="#问题-1-k3s-中有哪些核心概念" aria-label="Permalink to &quot;问题 1：k3s 中有哪些核心概念？&quot;">​</a></h2><p><strong>解析回答：</strong></p><p>k3s 是轻量级 Kubernetes 发行版，核心概念分为 <strong>控制平面组件</strong>、<strong>数据存储</strong>、<strong>工作负载资源</strong>、<strong>网络与服务</strong>、<strong>内置工具</strong> 五大类。</p><h3 id="一、控制平面组件-control-plane" tabindex="-1">一、控制平面组件（Control Plane） <a class="header-anchor" href="#一、控制平面组件-control-plane" aria-label="Permalink to &quot;一、控制平面组件（Control Plane）&quot;">​</a></h3><table tabindex="0"><thead><tr><th>组件</th><th>作用</th></tr></thead><tbody><tr><td><strong>API Server</strong></td><td>集群的&quot;前台&quot;，所有操作（kubectl、内部组件通信）都通过它</td></tr><tr><td><strong>Scheduler</strong></td><td>调度器，决定新 Pod 放在哪个节点上运行</td></tr><tr><td><strong>Controller Manager</strong></td><td>运行各种控制器（Deployment 控制器、ReplicaSet 控制器等），维持期望状态</td></tr><tr><td><strong>Kubelet</strong></td><td>每个节点上的&quot;管家&quot;，负责启动/停止容器、上报节点状态</td></tr><tr><td><strong>Kube-proxy</strong></td><td>维护节点网络规则，实现 Service 的负载均衡</td></tr></tbody></table><p>k3s 将这些组件打包成 <strong>单个二进制文件</strong>（~70MB），传统 K8s 中每个组件是独立进程。</p><h3 id="二、数据存储" tabindex="-1">二、数据存储 <a class="header-anchor" href="#二、数据存储" aria-label="Permalink to &quot;二、数据存储&quot;">​</a></h3><table tabindex="0"><thead><tr><th>组件</th><th>说明</th></tr></thead><tbody><tr><td><strong>Kine</strong></td><td>k3s 特有的 etcd 替代层，默认使用 <strong>SQLite3</strong>，也支持 PostgreSQL/MySQL/etcd</td></tr><tr><td><strong>etcd</strong></td><td>传统 K8s 的分布式键值存储，k3s HA 模式下可用</td></tr></tbody></table><p>单节点用 SQLite，HA 用嵌入式 etcd 或外部数据库。</p><h3 id="三、工作负载资源-kubernetes-原生" tabindex="-1">三、工作负载资源（Kubernetes 原生） <a class="header-anchor" href="#三、工作负载资源-kubernetes-原生" aria-label="Permalink to &quot;三、工作负载资源（Kubernetes 原生）&quot;">​</a></h3><table tabindex="0"><thead><tr><th>资源</th><th>作用</th></tr></thead><tbody><tr><td><strong>Pod</strong></td><td>最小调度单元，一个或多个容器</td></tr><tr><td><strong>Deployment</strong></td><td>声明式管理 Pod 副本，支持滚动更新</td></tr><tr><td><strong>ReplicaSet</strong></td><td>确保指定数量的 Pod 副本运行（通常由 Deployment 管理）</td></tr><tr><td><strong>StatefulSet</strong></td><td>有状态应用（如数据库），保证稳定的网络标识和存储</td></tr><tr><td><strong>DaemonSet</strong></td><td>每个节点运行一个 Pod（如日志收集器）</td></tr><tr><td><strong>Job / CronJob</strong></td><td>一次性/定时任务</td></tr><tr><td><strong>ConfigMap</strong></td><td>存储非敏感配置数据</td></tr><tr><td><strong>Secret</strong></td><td>存储敏感数据（密码、Token）</td></tr></tbody></table><h3 id="四、网络与服务" tabindex="-1">四、网络与服务 <a class="header-anchor" href="#四、网络与服务" aria-label="Permalink to &quot;四、网络与服务&quot;">​</a></h3><table tabindex="0"><thead><tr><th>资源</th><th>作用</th></tr></thead><tbody><tr><td><strong>Service</strong></td><td>为一组 Pod 提供稳定的网络访问入口（ClusterIP/NodePort/LoadBalancer）</td></tr><tr><td><strong>Ingress</strong></td><td>HTTP/HTTPS 路由规则，将外部流量导向 Service</td></tr><tr><td><strong>NetworkPolicy</strong></td><td>网络隔离策略</td></tr><tr><td><strong>PersistentVolume (PV) / PersistentVolumeClaim (PVC)</strong></td><td>持久化存储</td></tr></tbody></table><h3 id="五、k3s-内置工具-电池已包含" tabindex="-1">五、k3s 内置工具（&quot;电池已包含&quot;） <a class="header-anchor" href="#五、k3s-内置工具-电池已包含" aria-label="Permalink to &quot;五、k3s 内置工具（&quot;电池已包含&quot;）&quot;">​</a></h3><table tabindex="0"><thead><tr><th>组件</th><th>作用</th></tr></thead><tbody><tr><td><strong>containerd</strong></td><td>容器运行时（Docker 底层同款）</td></tr><tr><td><strong>Flannel</strong></td><td>CNI 网络插件，提供 Pod 间网络</td></tr><tr><td><strong>Traefik</strong></td><td>默认 Ingress Controller</td></tr><tr><td><strong>CoreDNS</strong></td><td>集群 DNS 服务</td></tr><tr><td><strong>ServiceLB</strong></td><td>内置负载均衡器（替代 MetalLB）</td></tr><tr><td><strong>Local-path-provisioner</strong></td><td>本地存储供应器</td></tr><tr><td><strong>Metrics-server</strong></td><td>资源监控</td></tr><tr><td><strong>Helm Controller</strong></td><td>通过 HelmChart CRD 声明式管理 Helm Chart</td></tr></tbody></table><p>这些在传统 K8s 中都需要手动安装，k3s 开箱即用。</p><hr><h2 id="问题-2-k3s-这些核心概念有何关联-如何协作组成一个-k3s-系统" tabindex="-1">问题 2：k3s 这些核心概念有何关联，如何协作组成一个 k3s 系统？ <a class="header-anchor" href="#问题-2-k3s-这些核心概念有何关联-如何协作组成一个-k3s-系统" aria-label="Permalink to &quot;问题 2：k3s 这些核心概念有何关联，如何协作组成一个 k3s 系统？&quot;">​</a></h2><p><strong>解析回答：</strong></p><p>用一个 <strong>前端应用部署场景</strong> 来串联所有概念的协作关系：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                     用户操作层                                     │</span></span>
<span class="line"><span>│  kubectl apply -f frontend.yaml  ──→ API Server                  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                              │</span></span>
<span class="line"><span>                              ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                     控制平面（k3s Server）                        │</span></span>
<span class="line"><span>│  API Server ──→ etcd/SQLite（存储期望状态）                        │</span></span>
<span class="line"><span>│       │                                                        │</span></span>
<span class="line"><span>│       ├──→ Scheduler（选择节点）                                  │</span></span>
<span class="line"><span>│       ├──→ Controller Manager（创建 ReplicaSet）                  │</span></span>
<span class="line"><span>│       └──→ 各控制器持续&quot;调谐&quot;（Reconcile）实际状态 ≈ 期望状态      │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                              │</span></span>
<span class="line"><span>                              ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                     工作节点（k3s Agent）                          │</span></span>
<span class="line"><span>│  Kubelet ──→ containerd ──→ 创建 Pod/容器                        │</span></span>
<span class="line"><span>│       │                                                        │</span></span>
<span class="line"><span>│       ├──→ 挂载 ConfigMap/Secret 为环境变量或文件                  │</span></span>
<span class="line"><span>│       ├──→ 挂载 PVC（Local-path-provisioner 自动创建 PV）          │</span></span>
<span class="line"><span>│       └──→ 上报 Pod 状态给 API Server                             │</span></span>
<span class="line"><span>│                                                                │</span></span>
<span class="line"><span>│  Kube-proxy ──→ 维护 iptables 规则 ──→ 实现 Service 负载均衡        │</span></span>
<span class="line"><span>│  Flannel ──→ 分配 Pod IP ──→ 跨节点 Pod 通信                       │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                              │</span></span>
<span class="line"><span>                              ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                     外部访问层                                     │</span></span>
<span class="line"><span>│  外部请求 ──→ Ingress (Traefik) ──→ Service ──→ Pod              │</span></span>
<span class="line"><span>│           域名路由          负载均衡      容器                     │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p><strong>协作流程详解：</strong></p><ol><li><p><strong>用户声明期望状态</strong>：通过 YAML 定义 Deployment（3 个副本）、Service（暴露 80 端口）、Ingress（域名 <code>frontend.local</code>）</p></li><li><p><strong>API Server 接收并存储</strong>：将 YAML 解析后存入 SQLite/etcd</p></li><li><p><strong>Scheduler 调度</strong>：为新 Pod 选择资源充足的节点</p></li><li><p><strong>Controller Manager 创建 ReplicaSet</strong>：ReplicaSet 确保始终有 3 个 Pod 运行</p></li><li><p><strong>Kubelet 执行</strong>：在选定节点上通过 containerd 拉取镜像、创建容器</p></li><li><p><strong>Kube-proxy 配置网络</strong>：为 Service 创建虚拟 IP，实现 3 个 Pod 的负载均衡</p></li><li><p><strong>Traefik 处理入口流量</strong>：根据 Ingress 规则，将 <code>frontend.local</code> 的请求路由到 Service</p></li><li><p><strong>持续调谐</strong>：如果某个 Pod 崩溃，Controller Manager 检测到实际状态 ≠ 期望状态，自动创建新 Pod 补齐</p></li></ol><p>这就是 Kubernetes <strong>声明式 + 自修复</strong> 的核心哲学。</p><hr><h2 id="问题-3-helm-中有哪些核心概念" tabindex="-1">问题 3：Helm 中有哪些核心概念？ <a class="header-anchor" href="#问题-3-helm-中有哪些核心概念" aria-label="Permalink to &quot;问题 3：Helm 中有哪些核心概念？&quot;">​</a></h2><p><strong>解析回答：</strong></p><p>Helm 是 Kubernetes 的包管理器，核心概念分为 <strong>包管理</strong>、<strong>模板系统</strong>、<strong>生命周期管理</strong>、<strong>依赖管理</strong> 四大类。</p><h3 id="一、包管理概念" tabindex="-1">一、包管理概念 <a class="header-anchor" href="#一、包管理概念" aria-label="Permalink to &quot;一、包管理概念&quot;">​</a></h3><table tabindex="0"><thead><tr><th>概念</th><th>说明</th></tr></thead><tbody><tr><td><strong>Chart</strong></td><td>Helm 包，一组模板化的 K8s 资源集合，类比 <code>.deb</code> 或 <code>.pkg</code></td></tr><tr><td><strong>Repository</strong></td><td>Chart 仓库，类比 apt 源，存放可下载的 Chart</td></tr><tr><td><strong>Release</strong></td><td>Chart 的一次安装实例，同一个 Chart 可安装多次（不同 Release 名）</td></tr></tbody></table><h3 id="二、模板系统概念" tabindex="-1">二、模板系统概念 <a class="header-anchor" href="#二、模板系统概念" aria-label="Permalink to &quot;二、模板系统概念&quot;">​</a></h3><table tabindex="0"><thead><tr><th>概念</th><th>说明</th></tr></thead><tbody><tr><td><strong>templates/</strong></td><td>存放 K8s 资源模板文件（.yaml），使用 Go template 语法</td></tr><tr><td><strong>values.yaml</strong></td><td>默认配置值，用户可覆盖</td></tr><tr><td><strong>Chart.yaml</strong></td><td>Chart 元数据（名称、版本、依赖、描述）</td></tr><tr><td><strong>_helpers.tpl</strong></td><td>命名模板/辅助函数，用于生成标准化名称和标签</td></tr><tr><td><strong>.helmignore</strong></td><td>打包时忽略的文件列表</td></tr></tbody></table><h3 id="三、生命周期管理概念" tabindex="-1">三、生命周期管理概念 <a class="header-anchor" href="#三、生命周期管理概念" aria-label="Permalink to &quot;三、生命周期管理概念&quot;">​</a></h3><table tabindex="0"><thead><tr><th>概念</th><th>说明</th></tr></thead><tbody><tr><td><strong>install</strong></td><td>首次安装 Chart，创建一个 Release</td></tr><tr><td><strong>upgrade</strong></td><td>升级已有 Release，记录为新 Revision</td></tr><tr><td><strong>rollback</strong></td><td>回滚到指定 Revision</td></tr><tr><td><strong>uninstall</strong></td><td>删除 Release 及其所有资源</td></tr><tr><td><strong>Revision</strong></td><td>每次 install/upgrade 生成一个版本号，用于回滚</td></tr></tbody></table><h3 id="四、依赖与高级概念" tabindex="-1">四、依赖与高级概念 <a class="header-anchor" href="#四、依赖与高级概念" aria-label="Permalink to &quot;四、依赖与高级概念&quot;">​</a></h3><table tabindex="0"><thead><tr><th>概念</th><th>说明</th></tr></thead><tbody><tr><td><strong>dependencies</strong></td><td>Chart 可依赖其他 Chart（如前端依赖 Redis、MySQL）</td></tr><tr><td><strong>Hook</strong></td><td>在 Release 生命周期特定阶段执行的 Job（如 pre-install 数据库迁移）</td></tr><tr><td><strong>Helm Controller</strong></td><td>k3s 内置的声明式 Helm 管理器，通过 HelmChart CRD 操作</td></tr></tbody></table><hr><h2 id="问题-4-helm-中这些核心概念有何关联-如何协作实现在-k3s-中的-gitops" tabindex="-1">问题 4：Helm 中这些核心概念有何关联，如何协作实现在 k3s 中的 GitOps？ <a class="header-anchor" href="#问题-4-helm-中这些核心概念有何关联-如何协作实现在-k3s-中的-gitops" aria-label="Permalink to &quot;问题 4：Helm 中这些核心概念有何关联，如何协作实现在 k3s 中的 GitOps？&quot;">​</a></h2><p><strong>解析回答：</strong></p><h3 id="helm-核心概念的协作关系" tabindex="-1">Helm 核心概念的协作关系 <a class="header-anchor" href="#helm-核心概念的协作关系" aria-label="Permalink to &quot;Helm 核心概念的协作关系&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    Helm 包管理流程                            │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│  Chart Repository ──→ helm repo add ──→ 本地索引缓存          │</span></span>
<span class="line"><span>│       │                                                     │</span></span>
<span class="line"><span>│       ├──→ helm search repo ──→ 查找 Chart                   │</span></span>
<span class="line"><span>│       │                                                     │</span></span>
<span class="line"><span>│       └──→ helm install myapp bitnami/nginx                 │</span></span>
<span class="line"><span>│                  │                                          │</span></span>
<span class="line"><span>│                  ▼                                          │</span></span>
<span class="line"><span>│           ┌─────────────┐                                  │</span></span>
<span class="line"><span>│           │   Release   │  ←── 安装实例，可多次创建           │</span></span>
<span class="line"><span>│           │   myapp     │                                  │</span></span>
<span class="line"><span>│           └──────┬──────┘                                  │</span></span>
<span class="line"><span>│                  │                                          │</span></span>
<span class="line"><span>│                  ▼                                          │</span></span>
<span class="line"><span>│           ┌─────────────┐                                  │</span></span>
<span class="line"><span>│           │  Revision 1 │  ←── 首次安装                     │</span></span>
<span class="line"><span>│           │  Revision 2 │  ←── helm upgrade                 │</span></span>
<span class="line"><span>│           │  Revision 3 │  ←── 再次 upgrade                  │</span></span>
<span class="line"><span>│           └─────────────┘                                  │</span></span>
<span class="line"><span>│                  │                                          │</span></span>
<span class="line"><span>│                  ▼                                          │</span></span>
<span class="line"><span>│           helm rollback myapp 2  ──→ 回滚到 Revision 2       │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="helm-模板渲染流程" tabindex="-1">Helm 模板渲染流程 <a class="header-anchor" href="#helm-模板渲染流程" aria-label="Permalink to &quot;Helm 模板渲染流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>values.yaml（默认值） ──┐</span></span>
<span class="line"><span>                       ├──→ helm template → 渲染为完整 K8s YAML</span></span>
<span class="line"><span>templates/*.yaml ──────┘      （Go template 语法 + 变量注入）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户自定义 values.yaml ──→ 覆盖默认值 ──→ 生成环境专属配置</span></span></code></pre></div><h3 id="helm-k3s-gitops-的完整协作架构" tabindex="-1">Helm + k3s + GitOps 的完整协作架构 <a class="header-anchor" href="#helm-k3s-gitops-的完整协作架构" aria-label="Permalink to &quot;Helm + k3s + GitOps 的完整协作架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                        Git 仓库（唯一真相源）                      │</span></span>
<span class="line"><span>│  ├─── apps/frontend/                                            │</span></span>
<span class="line"><span>│  │    ├── helm/frontend-chart/    ← Chart（模板）                │</span></span>
<span class="line"><span>│  │    │    ├── Chart.yaml                                       │</span></span>
<span class="line"><span>│  │    │    ├── values.yaml      ← 默认值                        │</span></span>
<span class="line"><span>│  │    │    └── templates/                                      │</span></span>
<span class="line"><span>│  │    ├── values-dev.yaml       ← 开发环境配置                   │</span></span>
<span class="line"><span>│  │    ├── values-staging.yaml   ← 测试环境配置                   │</span></span>
<span class="line"><span>│  │    └── values-prod.yaml      ← 生产环境配置                   │</span></span>
<span class="line"><span>│  │                                                              │</span></span>
<span class="line"><span>│  └─── apps/argocd/                                              │</span></span>
<span class="line"><span>│       └── application.yaml      ← ArgoCD Application 定义        │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                              │</span></span>
<span class="line"><span>                              ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                     ArgoCD（GitOps 控制器）                       │</span></span>
<span class="line"><span>│  1. 持续轮询 Git 仓库变化                                         │</span></span>
<span class="line"><span>│  2. 检测到 values-prod.yaml 中 image.tag 变更                    │</span></span>
<span class="line"><span>│  3. 执行 helm template → 渲染完整 K8s YAML                       │</span></span>
<span class="line"><span>│  4. 对比集群实际状态 vs Git 期望状态                               │</span></span>
<span class="line"><span>│  5. 发现差异 → 自动同步（Sync）到 k3s                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                              │</span></span>
<span class="line"><span>                              ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                        k3s 集群                                  │</span></span>
<span class="line"><span>│  ├── API Server 接收渲染后的 YAML                                │</span></span>
<span class="line"><span>│  ├── Controller Manager 创建/更新资源                             │</span></span>
<span class="line"><span>│  ├── Helm Controller（可选）直接管理 HelmChart CRD               │</span></span>
<span class="line"><span>│  └── 应用更新完成                                               │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><p><strong>GitOps 工作流的具体步骤：</strong></p><ol><li><strong>开发者提交代码</strong> → CI 构建新镜像 <code>frontend:v1.1</code> → 推送到镜像仓库</li><li><strong>CI 自动更新 Git</strong>：修改 <code>values-prod.yaml</code> 中的 <code>image.tag: v1.1</code>，提交到 Git</li><li><strong>ArgoCD 检测到变更</strong>：拉取最新 Git 状态</li><li><strong>ArgoCD 执行 Helm 渲染</strong>：<code>helm template</code> + <code>values-prod.yaml</code> → 生成完整 K8s 资源</li><li><strong>ArgoCD 同步到 k3s</strong>：<code>kubectl apply</code> 渲染后的 YAML</li><li><strong>k3s 执行滚动更新</strong>：Deployment 创建新 Pod，逐步替换旧 Pod</li><li><strong>ArgoCD 标记同步完成</strong>：Git 状态 = 集群状态</li></ol><p><strong>关键优势：</strong></p><ul><li>Git 是<strong>唯一真相源</strong>，所有变更可追溯</li><li>不需要 CI 直接访问 k3s（更安全）</li><li>支持自动回滚、配置漂移检测</li><li>多环境统一管理，只需不同 values 文件</li></ul><hr><h2 id="问题-5-一个全栈应用-不使用-helm-的时候-从合并代码到构建到部署-k3s-的全流程是怎样的" tabindex="-1">问题 5：一个全栈应用，不使用 Helm 的时候，从合并代码到构建到部署 k3s 的全流程是怎样的？ <a class="header-anchor" href="#问题-5-一个全栈应用-不使用-helm-的时候-从合并代码到构建到部署-k3s-的全流程是怎样的" aria-label="Permalink to &quot;问题 5：一个全栈应用，不使用 Helm 的时候，从合并代码到构建到部署 k3s 的全流程是怎样的？&quot;">​</a></h2><p><strong>解析回答：</strong></p><h3 id="架构假设" tabindex="-1">架构假设 <a class="header-anchor" href="#架构假设" aria-label="Permalink to &quot;架构假设&quot;">​</a></h3><ul><li><strong>前端</strong>：React/Vue 应用，Docker 镜像</li><li><strong>后端</strong>：Node.js/Python API，Docker 镜像</li><li><strong>数据库</strong>：PostgreSQL（使用 k3s 的 Local-path-provisioner）</li><li><strong>CI/CD</strong>：GitHub Actions</li><li><strong>部署目标</strong>：单节点 k3s（Arch Linux）</li></ul><h3 id="完整流程图" tabindex="-1">完整流程图 <a class="header-anchor" href="#完整流程图" aria-label="Permalink to &quot;完整流程图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  阶段 1：代码合并（GitHub）                                              │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  Developer ──→ Push to feature branch ──→ Pull Request ──→ Code Review │</span></span>
<span class="line"><span>│                                    │                                    │</span></span>
<span class="line"><span>│                                    ▼                                    │</span></span>
<span class="line"><span>│                           Merge to main branch                        │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  阶段 2：CI 构建（GitHub Actions）                                        │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  Trigger: on.push.branches: [main]                                      │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  Job: build-frontend                                                    │</span></span>
<span class="line"><span>│    ├── Checkout code                                                    │</span></span>
<span class="line"><span>│    ├── Run tests (npm test)                                             │</span></span>
<span class="line"><span>│    ├── Build Docker image: docker build -t ghcr.io/org/frontend:\${SHA} │</span></span>
<span class="line"><span>│    └── Push to registry: docker push ghcr.io/org/frontend:\${SHA}       │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  Job: build-backend (并行执行)                                          │</span></span>
<span class="line"><span>│    ├── Checkout code                                                    │</span></span>
<span class="line"><span>│    ├── Run tests                                                        │</span></span>
<span class="line"><span>│    ├── Build Docker image: docker build -t ghcr.io/org/backend:\${SHA}   │</span></span>
<span class="line"><span>│    └── Push to registry: docker push ghcr.io/org/backend:\${SHA}         │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  阶段 3：部署到 k3s（GitHub Actions 第二个 Job）                          │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  Job: deploy                                                            │</span></span>
<span class="line"><span>│    ├── 配置 kubectl: 将 KUBECONFIG 写入 ~/.kube/config                   │</span></span>
<span class="line"><span>│    ├── 更新前端 Deployment:                                              │</span></span>
<span class="line"><span>│    │   kubectl set image deployment/frontend \\                          │</span></span>
<span class="line"><span>│    │     frontend=ghcr.io/org/frontend:\${SHA} -n production             │</span></span>
<span class="line"><span>│    ├── 更新后端 Deployment:                                              │</span></span>
<span class="line"><span>│    │   kubectl set image deployment/backend \\                           │</span></span>
<span class="line"><span>│    │     backend=ghcr.io/org/backend:\${SHA} -n production               │</span></span>
<span class="line"><span>│    ├── 等待滚动更新完成:                                                  │</span></span>
<span class="line"><span>│    │   kubectl rollout status deployment/frontend -n production         │</span></span>
<span class="line"><span>│    │   kubectl rollout status deployment/backend -n production          │</span></span>
<span class="line"><span>│    └── 验证: kubectl get pods -n production                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  阶段 4：k3s 内部执行（声明式调谐）                                       │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  API Server 接收 Deployment 更新                                        │</span></span>
<span class="line"><span>│       │                                                                 │</span></span>
<span class="line"><span>│       ├──→ etcd/SQLite 存储新期望状态                                    │</span></span>
<span class="line"><span>│       ├──→ Controller Manager 创建新 ReplicaSet                         │</span></span>
<span class="line"><span>│       ├──→ Scheduler 分配新 Pod 到节点                                   │</span></span>
<span class="line"><span>│       ├──→ Kubelet 拉取新镜像、创建新 Pod                                │</span></span>
<span class="line"><span>│       └──→ 旧 Pod 优雅终止，Service 自动切换流量                          │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  结果：零停机滚动更新完成                                                │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="不使用-helm-时的-k8s-资源清单-手动管理" tabindex="-1">不使用 Helm 时的 K8s 资源清单（手动管理） <a class="header-anchor" href="#不使用-helm-时的-k8s-资源清单-手动管理" aria-label="Permalink to &quot;不使用 Helm 时的 K8s 资源清单（手动管理）&quot;">​</a></h3><p>你需要维护以下 YAML 文件（假设放在 <code>k8s/</code> 目录下）：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># k8s/namespace.yaml</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Namespace</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">production</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># k8s/frontend-deployment.yaml</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">frontend</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    namespace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">production</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    replicas</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    selector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        matchLabels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            app</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">frontend</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            labels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                app</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">frontend</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            containers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">frontend</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ghcr.io/org/frontend:latest</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # CI 中会被覆盖</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                      - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">containerPort</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># k8s/frontend-service.yaml</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Service</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">frontend-service</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    namespace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">production</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    selector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        app</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">frontend</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          targetPort</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ClusterIP</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># k8s/frontend-ingress.yaml</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">networking.k8s.io/v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Ingress</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">frontend-ingress</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    namespace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">production</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    rules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">app.example.com</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              paths</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                    pathType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Prefix</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                    backend</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                        service</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                            name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">frontend-service</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                            port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                                number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># k8s/backend-deployment.yaml（类似前端，略）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># k8s/backend-service.yaml</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># k8s/backend-ingress.yaml</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># k8s/postgres-statefulset.yaml</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># k8s/postgres-service.yaml</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># k8s/postgres-pvc.yaml</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># k8s/configmap.yaml</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># k8s/secret.yaml</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ... 可能还有 HPA、NetworkPolicy 等</span></span></code></pre></div><h3 id="不使用-helm-的痛点" tabindex="-1">不使用 Helm 的痛点 <a class="header-anchor" href="#不使用-helm-的痛点" aria-label="Permalink to &quot;不使用 Helm 的痛点&quot;">​</a></h3><table tabindex="0"><thead><tr><th>痛点</th><th>说明</th></tr></thead><tbody><tr><td><strong>YAML 爆炸</strong></td><td>一个全栈应用可能有 15+ 个 YAML 文件，散落在 <code>k8s/</code> 目录中</td></tr><tr><td><strong>环境管理困难</strong></td><td>dev/staging/prod 需要复制多套 YAML，容易不一致</td></tr><tr><td><strong>版本管理混乱</strong></td><td>升级时手动改 image tag，容易出错</td></tr><tr><td><strong>无回滚能力</strong></td><td><code>kubectl set image</code> 后想回滚，需要手动记录旧版本</td></tr><tr><td><strong>复用性差</strong></td><td>下个新项目要复制粘贴并修改大量 YAML</td></tr><tr><td><strong>Secret 管理</strong></td><td>密码、Token 硬编码在 YAML 中不安全</td></tr></tbody></table><hr><h2 id="问题-6-一个全栈应用-使用-helm-的时候-从合并代码到构建到部署-k3s-的全流程是怎样的" tabindex="-1">问题 6：一个全栈应用，使用 Helm 的时候，从合并代码到构建到部署 k3s 的全流程是怎样的？ <a class="header-anchor" href="#问题-6-一个全栈应用-使用-helm-的时候-从合并代码到构建到部署-k3s-的全流程是怎样的" aria-label="Permalink to &quot;问题 6：一个全栈应用，使用 Helm 的时候，从合并代码到构建到部署 k3s 的全流程是怎样的？&quot;">​</a></h2><p><strong>解析回答：</strong></p><h3 id="架构假设-同上" tabindex="-1">架构假设（同上） <a class="header-anchor" href="#架构假设-同上" aria-label="Permalink to &quot;架构假设（同上）&quot;">​</a></h3><h3 id="完整流程图-helm-gitops-模式" tabindex="-1">完整流程图（Helm + GitOps 模式） <a class="header-anchor" href="#完整流程图-helm-gitops-模式" aria-label="Permalink to &quot;完整流程图（Helm + GitOps 模式）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  阶段 1：代码合并（GitHub）                                              │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  Developer ──→ PR ──→ Merge to main                                    │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  阶段 2：CI 构建（GitHub Actions）                                        │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  Job: build-frontend                                                    │</span></span>
<span class="line"><span>│    ├── Build &amp; push: ghcr.io/org/frontend:v1.1.0                        │</span></span>
<span class="line"><span>│    └── 输出版本号: v1.1.0                                                │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  Job: build-backend                                                     │</span></span>
<span class="line"><span>│    ├── Build &amp; push: ghcr.io/org/backend:v1.1.0                         │</span></span>
<span class="line"><span>│    └── 输出版本号: v1.1.0                                                │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  阶段 3：CI 更新 GitOps 仓库（关键差异！）                                 │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  Job: update-gitops                                                     │</span></span>
<span class="line"><span>│    ├── Checkout GitOps repo (独立仓库，存放所有 K8s 配置)                  │</span></span>
<span class="line"><span>│    ├── 修改 helm/apps/frontend/values-prod.yaml:                        │</span></span>
<span class="line"><span>│    │   image:                                                           │</span></span>
<span class="line"><span>│    │     tag: &quot;v1.1.0&quot;   ← 更新前端镜像版本                              │</span></span>
<span class="line"><span>│    ├── 修改 helm/apps/backend/values-prod.yaml:                         │</span></span>
<span class="line"><span>│    │   image:                                                           │</span></span>
<span class="line"><span>│    │     tag: &quot;v1.1.0&quot;   ← 更新后端镜像版本                              │</span></span>
<span class="line"><span>│    ├── git add . → git commit → git push                                │</span></span>
<span class="line"><span>│    └── 提交信息: &quot;chore: bump frontend &amp; backend to v1.1.0&quot;            │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  ⚠️ 注意：CI 不直接操作 k3s，只修改 Git 仓库！                            │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  阶段 4：ArgoCD 自动同步（GitOps 核心）                                   │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  ArgoCD 每 3 分钟轮询 GitOps 仓库                                        │</span></span>
<span class="line"><span>│       │                                                                 │</span></span>
<span class="line"><span>│       ├──→ 检测到 values-prod.yaml 变更                                   │</span></span>
<span class="line"><span>│       ├──→ 执行 helm template \\                                           │</span></span>
<span class="line"><span>│       │     --values values-prod.yaml \\                                 │</span></span>
<span class="line"><span>│       │     ./helm/apps/frontend \\                                      │</span></span>
<span class="line"><span>│       │     → 渲染完整 K8s YAML                                         │</span></span>
<span class="line"><span>│       ├──→ 对比集群实际状态 vs Git 期望状态                                │</span></span>
<span class="line"><span>│       ├──→ 发现差异（image tag 变了）                                     │</span></span>
<span class="line"><span>│       └──→ 自动执行 Sync：kubectl apply 渲染后的 YAML                     │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  结果：Git 状态 = 集群状态                                               │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                                    │</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  阶段 5：k3s 执行滚动更新（同问题 5）                                     │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  API Server → Controller Manager → Kubelet → 新 Pod 启动 → 旧 Pod 终止   │</span></span>
<span class="line"><span>│                                                                         │</span></span>
<span class="line"><span>│  附加：Helm Release 记录                                                 │</span></span>
<span class="line"><span>│  helm history frontend-prod                                             │</span></span>
<span class="line"><span>│  # REVISION  UPDATED       STATUS      CHART           APP VERSION      │</span></span>
<span class="line"><span>│  # 1        2026-06-01    deployed    frontend-1.0.0   1.0.0            │</span></span>
<span class="line"><span>│  # 2        2026-06-03    deployed    frontend-1.0.0   1.1.0            │</span></span>
<span class="line"><span>│  # 3        2026-06-05    deployed    frontend-1.0.0   1.1.0  ← 当前     │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="使用-helm-时的项目结构" tabindex="-1">使用 Helm 时的项目结构 <a class="header-anchor" href="#使用-helm-时的项目结构" aria-label="Permalink to &quot;使用 Helm 时的项目结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>my-fullstack-app/</span></span>
<span class="line"><span>├── frontend/                    # 前端源码</span></span>
<span class="line"><span>│   ├── src/</span></span>
<span class="line"><span>│   ├── Dockerfile</span></span>
<span class="line"><span>│   └── package.json</span></span>
<span class="line"><span>├── backend/                     # 后端源码</span></span>
<span class="line"><span>│   ├── src/</span></span>
<span class="line"><span>│   ├── Dockerfile</span></span>
<span class="line"><span>│   └── requirements.txt</span></span>
<span class="line"><span>├── helm/                        # Helm Charts（核心变化！）</span></span>
<span class="line"><span>│   ├── frontend-chart/          # 前端 Chart</span></span>
<span class="line"><span>│   │   ├── Chart.yaml</span></span>
<span class="line"><span>│   │   ├── values.yaml          # 默认值</span></span>
<span class="line"><span>│   │   ├── values-dev.yaml</span></span>
<span class="line"><span>│   │   ├── values-staging.yaml</span></span>
<span class="line"><span>│   │   ├── values-prod.yaml     # 生产环境配置</span></span>
<span class="line"><span>│   │   └── templates/</span></span>
<span class="line"><span>│   │       ├── _helpers.tpl</span></span>
<span class="line"><span>│   │       ├── deployment.yaml</span></span>
<span class="line"><span>│   │       ├── service.yaml</span></span>
<span class="line"><span>│   │       ├── ingress.yaml</span></span>
<span class="line"><span>│   │       ├── hpa.yaml</span></span>
<span class="line"><span>│   │       └── NOTES.txt</span></span>
<span class="line"><span>│   ├── backend-chart/           # 后端 Chart（结构类似）</span></span>
<span class="line"><span>│   └── postgres-chart/        # 数据库 Chart（或依赖 bitnami/postgres）</span></span>
<span class="line"><span>├── .github/</span></span>
<span class="line"><span>│   └── workflows/</span></span>
<span class="line"><span>│       └── deploy.yml           # CI/CD 配置</span></span>
<span class="line"><span>└── argocd/                      # ArgoCD Application 定义</span></span>
<span class="line"><span>    └── applications/</span></span>
<span class="line"><span>        ├── frontend-app.yaml</span></span>
<span class="line"><span>        └── backend-app.yaml</span></span></code></pre></div><h3 id="helm-chart-模板示例-templates-deployment-yaml" tabindex="-1">Helm Chart 模板示例（templates/deployment.yaml） <a class="header-anchor" href="#helm-chart-模板示例-templates-deployment-yaml" aria-label="Permalink to &quot;Helm Chart 模板示例（templates/deployment.yaml）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">include &quot;frontend-chart.fullname&quot; .</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  labels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {{- </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">include &quot;frontend-chart.labels&quot; . | nindent 4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  replicas</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.Values.replicaCount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  selector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    matchLabels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {{- </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">include &quot;frontend-chart.selectorLabels&quot; . | nindent 6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      labels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        {{- </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">include &quot;frontend-chart.selectorLabels&quot; . | nindent 8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      containers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.Chart.Name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          imagePullPolicy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.Values.image.pullPolicy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">http</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              containerPort</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          {{- </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">if .Values.resources</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          resources</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            {{- </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">toYaml .Values.resources | nindent 12</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          {{- </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          env</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            {{- </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">toYaml .Values.env | nindent 12</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }}</span></span></code></pre></div><h3 id="环境隔离的-values-文件" tabindex="-1">环境隔离的 values 文件 <a class="header-anchor" href="#环境隔离的-values-文件" aria-label="Permalink to &quot;环境隔离的 values 文件&quot;">​</a></h3><p><strong>values-dev.yaml</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">replicaCount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;latest&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">resources</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ingress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span></code></pre></div><p><strong>values-prod.yaml</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">replicaCount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;v1.1.0&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # CI 自动更新这里</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">resources</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    limits</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        cpu</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">1000m</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        memory</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">512Mi</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">autoscaling</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    minReplicas</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    maxReplicas</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ingress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    hosts</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">app.example.com</span></span></code></pre></div><h3 id="argocd-application-定义" tabindex="-1">ArgoCD Application 定义 <a class="header-anchor" href="#argocd-application-定义" aria-label="Permalink to &quot;ArgoCD Application 定义&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># argocd/applications/frontend-app.yaml</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">argoproj.io/v1alpha1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Application</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">frontend</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    namespace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">argocd</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    project</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">default</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    source</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        repoURL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">https://github.com/org/my-fullstack-app.git</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        targetRevision</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">main</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">helm/frontend-chart</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        helm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            valueFiles</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">values-prod.yaml</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    destination</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">https://kubernetes.default.svc</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        namespace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">production</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    syncPolicy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        automated</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            prune</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 删除 Git 中不存在的资源</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            selfHeal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 自动修复配置漂移</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        syncOptions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">CreateNamespace=true</span></span></code></pre></div><h3 id="两种模式的对比总结" tabindex="-1">两种模式的对比总结 <a class="header-anchor" href="#两种模式的对比总结" aria-label="Permalink to &quot;两种模式的对比总结&quot;">​</a></h3><table tabindex="0"><thead><tr><th>维度</th><th>不使用 Helm（原生 kubectl）</th><th>使用 Helm + GitOps</th></tr></thead><tbody><tr><td><strong>配置数量</strong></td><td>15+ 个独立 YAML 文件</td><td>1 个 Chart + 3 个 values 文件</td></tr><tr><td><strong>环境管理</strong></td><td>复制粘贴多套 YAML</td><td>同一 Chart，不同 values 文件</td></tr><tr><td><strong>镜像版本更新</strong></td><td><code>kubectl set image</code>（命令式）</td><td>修改 values.yaml 提交 Git（声明式）</td></tr><tr><td><strong>回滚</strong></td><td>手动记录旧版本，操作复杂</td><td><code>helm rollback</code> 或 ArgoCD 一键回滚</td></tr><tr><td><strong>版本历史</strong></td><td>无</td><td>Helm Revision 完整记录</td></tr><tr><td><strong>CI 权限</strong></td><td>CI 需要 k3s kubeconfig（安全风险）</td><td>CI 只需 Git 权限，ArgoCD 操作 k3s</td></tr><tr><td><strong>配置漂移检测</strong></td><td>无</td><td>ArgoCD 持续检测并自动修复</td></tr><tr><td><strong>审计追踪</strong></td><td>依赖 CI 日志</td><td>Git 提交历史 = 完整审计链</td></tr><tr><td><strong>团队协作</strong></td><td>容易冲突</td><td>Git PR 流程，Code Review 配置变更</td></tr><tr><td><strong>学习曲线</strong></td><td>低（直接 kubectl）</td><td>中（需学 Helm + ArgoCD）</td></tr></tbody></table><h3 id="推荐的渐进式演进路径" tabindex="-1">推荐的渐进式演进路径 <a class="header-anchor" href="#推荐的渐进式演进路径" aria-label="Permalink to &quot;推荐的渐进式演进路径&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>阶段 1（你现在）：kubectl + 原生 YAML</span></span>
<span class="line"><span>    ↓ 感到 YAML 管理痛苦</span></span>
<span class="line"><span>阶段 2：Helm CLI 手动管理</span></span>
<span class="line"><span>    helm install / helm upgrade</span></span>
<span class="line"><span>    ↓ 需要自动化</span></span>
<span class="line"><span>阶段 3：Helm + CI 脚本自动部署</span></span>
<span class="line"><span>    CI 中执行 helm upgrade</span></span>
<span class="line"><span>    ↓ 需要更安全、可审计</span></span>
<span class="line"><span>阶段 4：Helm + ArgoCD GitOps（推荐终点）</span></span>
<span class="line"><span>    CI 只改 Git，ArgoCD 自动同步</span></span></code></pre></div><p>对于你的场景（Arch Linux 单机 k3s、前端镜像部署），建议从 <strong>阶段 2</strong> 开始，先掌握 Helm CLI 的基本使用，再逐步过渡到 <strong>阶段 4</strong> 的完整 GitOps 工作流。</p>`,86)])])}const g=a(l,[["render",t]]);export{c as __pageData,g as default};
