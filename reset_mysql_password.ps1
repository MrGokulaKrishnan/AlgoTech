# Run this script as Administrator in PowerShell
# It resets the MySQL root password to: Krish@7204

$mysql    = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
$mysqld   = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe"
$datadir  = "C:\ProgramData\MySQL\MySQL Server 8.0\Data"
$initFile = "$env:TEMP\reset_root.sql"

Write-Host "`n=== AlgoVisual: MySQL Root Password Reset ===" -ForegroundColor Cyan

# Write the SQL to reset the password
@"
ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'Krish@7204';
FLUSH PRIVILEGES;
"@ | Out-File -Encoding ascii $initFile

Write-Host "1. Stopping MySQL80 service..." -ForegroundColor Yellow
Stop-Service MySQL80 -Force -ErrorAction Stop
Start-Sleep 2
Write-Host "   MySQL stopped." -ForegroundColor Green

Write-Host "2. Starting MySQL with --init-file to reset password..." -ForegroundColor Yellow
$proc = Start-Process $mysqld -ArgumentList "--defaults-file=`"C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`" --init-file=`"$initFile`"" -PassThru -WindowStyle Hidden
Start-Sleep 8
$proc | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep 2
Write-Host "   Password reset applied." -ForegroundColor Green

Write-Host "3. Starting MySQL80 service normally..." -ForegroundColor Yellow
Start-Service MySQL80
Start-Sleep 3
Write-Host "   MySQL running." -ForegroundColor Green

Write-Host "4. Verifying new password..." -ForegroundColor Yellow
$env:MYSQL_PWD = 'Krish@7204'
$result = & $mysql -u root -e "SELECT 'Connection OK', VERSION();" 2>&1
$env:MYSQL_PWD = ''

if ($result -match "Connection OK") {
    Write-Host "`n✅ SUCCESS! MySQL root password is now: Krish@7204" -ForegroundColor Green
} else {
    Write-Host "`n❌ Verification failed. Check the MySQL error log." -ForegroundColor Red
    Write-Host $result
}

Remove-Item $initFile -ErrorAction SilentlyContinue
Write-Host "`nDone. You can close this window." -ForegroundColor Cyan
