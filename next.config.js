require('dotenv').config();
/** @type {import('next').NextConfig} */

const desa = process.env._ENV === 'DESA_GIS'
const localhost = process.env._ENV === 'LOCAL_DEV'
const prod = process.env._ENV === 'PRODUCCION'
let url = '';
let access = '';
if (desa) {url = 'https://desa-gis.gassur.cl/gassur-dashboard'; access = '/gassur-dashboard'}
if (prod) {url = 'https://gis.gassur.cl/gassur-dashboard'; access = '/gassur-dashboard'}
if (localhost) url = undefined 

const nextConfig = {
  basePath: '',
  assetPrefix: url,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: access + '/dashboard',
        permanent: true,
      },

    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: 'raw-loader',
    });
    return config;
  }


};


module.exports = nextConfig

