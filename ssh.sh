#!/bin/bash

# Windows Git Bash 兼容的端口占用检查
check_and_kill_port() {
  local port=$1
  # 使用 Windows 的 netstat 查找 PID
  pid=$(netstat -ano | grep ":$port" | grep LISTENING | awk '{print $5}' | head -n 1)
  if [ ! -z "$pid" ]; then
    echo "终止占用端口 $port 的进程 (PID: $pid)"
    taskkill //PID $pid //F
  fi
}

# 检查并终止占用端口的进程
for port in 53748 59284 57236; do
  check_and_kill_port $port
done

# 启动所有隧道（后台运行）
ssh -l lkx -NL 53748:localhost:53748 -p 58274 test-tx-01.tintan.net &
ssh -l lkx -NL 59284:localhost:59284 -p 58274 test-tx-01.tintan.net &
ssh -l lkx -NL 57236:localhost:57236 -p 58274 test-tx-01.tintan.net &

# 等待1秒让隧道初始化
sleep 1

# 检查隧道状态
echo -e "\nSSH 隧道状态："
for port in 53748 59284 57236; do
  if netstat -ano | grep ":$port" | grep LISTENING >/dev/null; then
    echo "[成功] 端口 $port 转发已建立"
  else
    echo "[失败] 端口 $port 转发未建立"
  fi
done