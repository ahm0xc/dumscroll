import axios from "axios";

import { APP_URL } from "~/config";

export async function validateLicenseKey(licenseKey: string): Promise<boolean> {
  try {
    const { data } = await axios.post(`${APP_URL}/api/validate-license`, {
      licenseKey,
    });
    if (data.licenseKey) return true;
    throw new Error("Invalid license key");
  } catch (error) {
    console.error(`🚨 Error validating license key: ${licenseKey}`, error);
    return false;
  }
}
