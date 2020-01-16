export function download(content: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.style.display = 'none';
  const blob = new Blob([content]);
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
