import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'AI-Mognadsmätaren - Mät er organisations AI-mognad';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'public', 'aimognad-logo.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2d4a2d',
          padding: '60px',
        }}
      >
        {/* Logo */}
        <img
          src={logoBase64}
          width="180"
          height="180"
          style={{ marginBottom: '30px' }}
        />

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            AI-Mognadsmätaren
          </div>
          <div
            style={{
              fontSize: '32px',
              color: '#F5A623',
              textAlign: 'center',
            }}
          >
            Mät er organisations AI-mognad
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '24px',
          }}
        >
          <span>Critero AB</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
