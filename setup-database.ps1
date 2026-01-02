# HerMindmate Database Setup Script
Write-Host "🚀 Setting up HerMindmate Production Database..." -ForegroundColor Cyan

# Check if database exists
if (Test-Path "prisma/dev.db") {
    Write-Host "✅ Database file found" -ForegroundColor Green
} else {
    Write-Host "📁 Creating new database..." -ForegroundColor Yellow
}

# Run Prisma commands
Write-Host "`n📊 Pushing database schema..." -ForegroundColor Cyan
npx prisma db push --accept-data-loss

Write-Host "`n🌱 Seeding database with initial data..." -ForegroundColor Cyan
npx prisma db seed

Write-Host "`n✨ Database setup complete!" -ForegroundColor Green
Write-Host "`n📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to http://localhost:3000/admin" -ForegroundColor White
Write-Host "2. You'll see 2 doctors and 3 services" -ForegroundColor White
Write-Host "3. Try adding/editing them!" -ForegroundColor White
Write-Host "`n🎉 Your site is production-ready!" -ForegroundColor Cyan
