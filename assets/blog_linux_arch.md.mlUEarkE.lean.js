import{_ as i,c as a,a0 as n,o as l}from"./chunks/framework.D4Ss6-bc.js";const g=JSON.parse('{"title":"安装 Arch","description":"","frontmatter":{"outline":[2,3]},"headers":[],"relativePath":"blog/linux/arch.md","filePath":"blog/linux/arch.md"}'),p={name:"blog/linux/arch.md"};function h(k,s,t,e,F,r){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="安装-arch" tabindex="-1">安装 Arch <a class="header-anchor" href="#安装-arch" aria-label="Permalink to &quot;安装 Arch&quot;">​</a></h1><h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>大环境往信创发展，Windows/MacOS 摆烂，都在指引我们走向 Linux。</p><h2 id="为什么" tabindex="-1">为什么 <a class="header-anchor" href="#为什么" aria-label="Permalink to &quot;为什么&quot;">​</a></h2><p>针对大环境的情况，我们可以选择 debian 系的 Linux，往往有更快的国产软件包支持。</p><p>针对普适性的情况，可以选择 Arch，有更新的软件包支持，缩短 bug 留存时间。同时很快移植 debian 系中的国产软件包。</p><div class="info custom-block"><p class="custom-block-title">Windows 的问题</p><ol><li>莫名其妙卡顿，但系统资源占用率低</li><li>终端默认使用 GBK 编码，导致程序执行容易乱码，如 go、zig 执行</li></ol></div><div class="info custom-block"><p class="custom-block-title">Linux 的问题</p><ol><li>缺少专有软件（寻找替代品含网页版，创造替代品）</li><li>遇到问题难以解决，往往需要对系统有一定的熟悉度（问 GPT）</li></ol></div><h2 id="如何安装" tabindex="-1">如何安装 <a class="header-anchor" href="#如何安装" aria-label="Permalink to &quot;如何安装&quot;">​</a></h2><h3 id="○-准备" tabindex="-1">○ 准备 <a class="header-anchor" href="#○-准备" aria-label="Permalink to &quot;○ 准备&quot;">​</a></h3><ol><li>预留空闲分区</li><li>下载 arch iso 镜像，存放至 ventoy 移动盘中</li><li>重启，按 f12 进入 安装</li></ol><div class="warning custom-block"><p class="custom-block-title">适用性</p><p>注意适用情况</p></div><div class="tip custom-block"><p class="custom-block-title">难点</p><ol><li>区分安装环境与结果环境</li><li>区分终端脚本与交互脚本（iwctl、wim 等）</li><li>区分硬盘、分区、卷、子卷</li></ol></div><h3 id="○-连接-wifi" tabindex="-1">○ 连接 wifi <a class="header-anchor" href="#○-连接-wifi" aria-label="Permalink to &quot;○ 连接 wifi&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 连接 wifi</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 忽略下方 [iwd]，进表示在 iwctl 中执行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">iwctl</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[iwd] device list</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[iwd] exit</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rfkill</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> link</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wlan0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 如果看到 Operation not possible due to RF-kill，执行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rfkill</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> unblock</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wifi</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 扫描</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">iwctl</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[iwd] station wlan0 scan</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[iwd] station wlan0 get-networks</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[iwd] station wlan0 connect \${wifi_name}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[iwd] exit</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ping</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> www.bilibili.com</span></span></code></pre></div><h3 id="○-更新系统时钟" tabindex="-1">○ 更新系统时钟 <a class="header-anchor" href="#○-更新系统时钟" aria-label="Permalink to &quot;○ 更新系统时钟&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 更新系统时钟</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">timedatectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set-ntp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">timedatectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span></span></code></pre></div><h3 id="○-更新镜像源" tabindex="-1">○ 更新镜像源 <a class="header-anchor" href="#○-更新镜像源" aria-label="Permalink to &quot;○ 更新镜像源&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 更新镜像源</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reflector</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> China</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --sort</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> score</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --save</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/pacman.d/mirrorlist</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#（可选）pacman 并行下载 + 颜色</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/pacman.conf</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 删除 Misc options 下的 Color 和 ParallelDownloads 前面的注释</span></span></code></pre></div><h3 id="○-分区" tabindex="-1">○ 分区 <a class="header-anchor" href="#○-分区" aria-label="Permalink to &quot;○ 分区&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查 UEFI</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /sys/firmware/efi/efivars</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看分区</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看硬盘及分区，概览</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lsblk</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看硬盘及分区，详情</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fdisk</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -l</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看当前挂载情况</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">df</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># cfdisk 分区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cfdisk</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /dev/nvme0n1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 需提前有 EFI 分区或自行创建，512M</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># free space -&gt; new -&gt; type swap -&gt; 8G，用于休眠</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># free space -&gt; new -&gt; type default</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># write -&gt; quit</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 格式化 EFI 分区，如双系统则不用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkfs.fat</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -F32</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /dev/nvme0n1p1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 格式化 swap 分区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkswap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /dev/nvme0n1pn</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在上一步新建的默认分区中，创建 btrfs 分区（注意硬盘分区正确）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 格式化 btrfs 分区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkfs.btrfs</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -L</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${分区名称 myArch} </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/dev/nvme0n1pn</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 挂载 btrfs 分区并创建子卷</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mount</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> btrfs</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compress=zstd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /dev/nvme0n1pn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查挂载情况</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">df</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建子卷</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">btrfs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> subvolume</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt/@</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">btrfs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> subvolume</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt/@home</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查子卷</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">btrfs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> subvolume</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 卸载 btrfs 分区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">unmount</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重新挂载 btrfs 文件系统，有序，先根目录再子卷</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mount</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> btrfs</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> subvol=/@,compress=zstd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /dev/nvme0n1pn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt/home</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mount</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> btrfs</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> subvol=/@home,compress=zstd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /dev/nvme0n1pn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt/home</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 同时挂载 EFI 分区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt/boot</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mount</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /dev/nvme0n1p1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt/boot</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 同时挂载 swap 分区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">swapon</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /dev/nvme0n1pn</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">df</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">free</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span></span></code></pre></div><h3 id="○-预装-arch" tabindex="-1">○ 预装 arch <a class="header-anchor" href="#○-预装-arch" aria-label="Permalink to &quot;○ 预装 arch&quot;">​</a></h3><div class="danger custom-block"><p class="custom-block-title">预备</p><p>必须先完成上一步“重新挂载 btrfs 文件系统”的操作</p></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 往挂载位置安装基础包</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pacstrap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> base</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> base-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> linux</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> linux-firmware</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> btrfs-progs</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pacstrap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> networkmanager</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pacstrap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> noto-fonts-cjk</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> noto-fonts-emoji</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 基于当前挂载生成系统自动挂载信息</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">genfstab</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -U</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt/etc/fstab</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt/etc/fstab</span></span></code></pre></div><h3 id="○-设置-arch" tabindex="-1">○ 设置 arch <a class="header-anchor" href="#○-设置-arch" aria-label="Permalink to &quot;○ 设置 arch&quot;">​</a></h3><div class="danger custom-block"><p class="custom-block-title">预备</p><p>必须先完成上一步“预装 arch”的操作</p></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 切换到结果环境（最终系统环境 arch）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">arch-chroot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加 hostname</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;\${hostname}&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/hostname</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加 hosts，host 中间用 tab 而不是空格</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/hosts</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">127.0.0.1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> localhost</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> localhost</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">127.0.1.1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myarch.localdomain</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myarch</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置时区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ln</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -sf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/share/zoneinfo/Asia/Shanghai</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/localtime</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置硬件时间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hwclock</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --systohc</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置语言</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/locale.gen</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 放开 en_US.UTF-8.UTF-8, zh_CN.UTF-8.UTF-8</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">locale-gen</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 不推荐系统中文，避免 tty 乱码</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;LANG=en_US.UTF-8&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/locale.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># root 密码</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">passwd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> root</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加新用户</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 需补充用 visudo 配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">useradd</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -G</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wheel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${user}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">passwd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${user}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装微码</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 或 intel-ucode</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> amd-ucode</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装引导程序</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> grub</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> efibootmgr</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> os-prober</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 grub 到 EFI 分区</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">grub-install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --target=x86_64-efi</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --efi-directory=/boot</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bootloader-id=ARCH</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 编辑 grub</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/default/grub</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 修改 GRUB_CMDLINE_LINUX_DEFAULT=&quot;loglevel=5 nowatchdog&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 新增 GRUB_DISABLE_OS_PROBER=false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 生成 grub 配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">grub-mkconfig</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /boot/grub/grub.cfg</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 退出结果环境，拔出 U 盘，重启</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exit</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">umount</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -R</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reboot</span></span></code></pre></div><h3 id="○-安装后" tabindex="-1">○ 安装后 <a class="header-anchor" href="#○-安装后" aria-label="Permalink to &quot;○ 安装后&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 非 root 登录</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动+开机自启网络管理</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --now</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> NetworkManager</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ping</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> www.bilibili.com</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 连接网络</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nmtui</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看系统信息</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fastfetch</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fastfetch</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装桌面 kde plasma</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> plasma</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kde-applications</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sddm</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 开机自启</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sddm</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重启</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置 -&gt; 区域和语言 -&gt; 简体中文</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重启不保留会话</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置 -&gt; 桌面会话 -&gt; 以空会话启动</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 如果没有识别 windows boot manager</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> grub-mkconfig</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /boot/grub/grub.cfg</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 nerd fonts</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 官网下载</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置 -&gt; 文字和字体 -&gt; 字体管理 -&gt; 安装字体文件</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Konsole 重启 -&gt; 配置 -&gt; 新建 -&gt; 字体</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 更换 shell</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zsh</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chsh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /bin/zsh</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Konsole 配置 -&gt; 新建 -&gt; 命令 zsh</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重启 Konsole</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#（可选）安装 oh-my-zsh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加源</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kate</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/pacman.conf</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[archlinuxcn]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$arch</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 去除 multilib 分组的注释</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pacman-key</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --lsign-key</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;farseerfc@archlinux.org&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Sy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> archlinuxcn-keyring</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 paru（yay 增强版）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 需提前安装 cargo</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> paru</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kate</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/paru.conf</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 去除 BottomUp 前面的注释</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装浏览器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> firefox</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chromium</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">paru</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> google-chrome</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 删除自带浏览器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -R</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> falkon</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> konqueror</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 更改 SDDM 样式：设置 -&gt; 登录屏幕</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装输入法，二选一（方案2完美）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fcitx5-im</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fcitx5-rime</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">paru</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fcitx5-input-support</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置 -&gt; 虚拟键盘 -&gt; fcitx5 wayland</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重启</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置 -&gt; 输入法 -&gt; 键盘托盘图标</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 右击托盘图标，选择输入方案</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 修改应用启动参数，支持输入</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 按 win -&gt; 右击应用 -&gt; 编辑应用程序 -&gt; 参数</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">--enable-features</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">UseOzonePlatform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --ozone-platform</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">wayland</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> --enable-wayland-ime</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 代理</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 如果 kde 系统代理不生效，终端代理变量不生效，可用 proxychains-ng</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> proxychains-ng</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/proxychains.conf</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[ProxyList]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127.0.0.1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7890</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 注释 proxy_dns</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 取消注释 quiet_mode</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 使用代理运行命令</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">proxychains</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${command}</span></span></code></pre></div><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://arch.icekylin.online/guide/" target="_blank" rel="noreferrer">archlinux 简明指南</a></li><li><a href="https://blog.csdn.net/orangebench11/article/details/139381701" target="_blank" rel="noreferrer">安装 Arch Linux 和 KDE Plasma 6 &amp; 配置 fcitx5-rime 输入法 | 轻度美化 | 双系统/虚拟机 （2024.6.1）</a>，较新，推荐</li></ul>`,31)]))}const c=i(p,[["render",h]]);export{g as __pageData,c as default};
