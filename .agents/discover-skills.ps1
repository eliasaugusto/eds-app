$ErrorActionPreference = 'Stop'

$skillsDir = '.claude/skills'

if (-not (Test-Path $skillsDir -PathType Container)) {
  Write-Output "No skills directory found at $skillsDir"
  exit 0
}

$skillFiles = Get-ChildItem -Path $skillsDir -Recurse -File -Filter 'SKILL.md' |
  Sort-Object FullName

if (-not $skillFiles -or $skillFiles.Count -eq 0) {
  Write-Output "No skills found in $skillsDir"
  exit 0
}

Write-Output 'Available Skills:'
Write-Output '=================='
Write-Output ''

foreach ($file in $skillFiles) {
  $skillName = Split-Path -Leaf (Split-Path -Parent $file.FullName)
  $content = Get-Content -Path $file.FullName

  $name = $null
  $description = $null

  if ($content.Count -gt 0 -and $content[0].Trim() -eq '---') {
    $endIndex = -1
    for ($i = 1; $i -lt $content.Count; $i += 1) {
      if ($content[$i].Trim() -eq '---') {
        $endIndex = $i
        break
      }
    }

    if ($endIndex -gt 1) {
      for ($j = 1; $j -lt $endIndex; $j += 1) {
        $line = $content[$j]
        if ($line -match '^name:\s*(.+)$') {
          $name = $Matches[1].Trim()
          continue
        }
        if ($line -match '^description:\s*(.+)$') {
          $description = $Matches[1].Trim()
          continue
        }
      }
    }
  }

  if ([string]::IsNullOrWhiteSpace($name)) {
    $name = $skillName
  }

  if ([string]::IsNullOrWhiteSpace($description)) {
    $description = 'No description'
  }

  $relativePath = $file.FullName.Replace((Get-Location).Path + '\\', '')

  Write-Output "Skill: $name"
  Write-Output "Path: $relativePath"
  Write-Output "Description: $description"
  Write-Output ''
  Write-Output '---'
  Write-Output ''
}
