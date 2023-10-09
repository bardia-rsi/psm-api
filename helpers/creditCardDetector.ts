import { StringMap } from "../types/Base";

const banks: StringMap = {
    "627412": "Eghtesad Novin",
    "627381": "Sepah", // Ansar
    "505785": "Iran Zamin",
    "622106": "Parsian",
    "639194": "Parsian",
    "627884": "Parsian",
    "639347": "Pasargad",
    "502229": "Pasargad",
    "636214": "Ayandeh", // Tat
    "627353": "Tejarat",
    "585983": "Tejarat",
    "502908": "Tose'e Ta'avon",
    "627648": "Export Development",
    "207177": "Export Development",
    "636949": "Sepah", // Hekmat
    "502938": "Day",
    "589463": "Refah",
    "621986": "Saman",
    "589210": "Sepah",
    "639607": "Sarmayeh",
    "639346": "Sina",
    "502806": "Shahr",
    "504706": "Shahr",
    "603769": "Saderat",
    "627961": "Industry & Mine",
    "606373": "Mehr Iran",
    "639599": "Sepah", // Ghavamin
    "502910": "Karafarin",
    "627488": "Karafarin",
    "603770": "Keshavarzi",
    "639217": "Keshavarzi",
    "505416": "tourism",
    "636795": "Central",
    "628023": "Maskan",
    "610433": "Mellat",
    "991975": "Mellat",
    "603799": "Melli",
    "507677": "Melli", // Noor
    "627760": "Post",
    "639370": "Sepah", // Mehr Eqtesad
    // "628157": "Tose'e", dissolved
    "505801": "Speah", // Kosar
    "504172": "Resalat",
    "606256": "Melal", // Askarieh
    "606737": "Mehr Iran"
}

export const iranianBankDetector = (bin: string | number): string | undefined => {

    bin = String(bin);

    if (bin.length !== 6) {
        return undefined;
    }

    return banks[bin];

}