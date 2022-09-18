import { Injectable } from '@angular/core';
import { DisplaySettings } from '../interfaces/display-settings.interface';
import { AccentColor } from '../interfaces/accent-color.interface';
import { BackgroundColor } from '../interfaces/background-color.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomizeViewService {

	private displaySettings: DisplaySettings
	private indexDBName = 'twlocalforage'
	private tableName = 'keyvaluepairs'
	private keyDeviceSettings = 'device.settings'
	private DB!: IDBDatabase

	private accentColorDefault: AccentColor = {
		color: 'text-twitter-accent-sky',
		hex: '#1D9BF0',
		bg: 'bg-twitter-accent-sky',
		bgHover: 'hover:bg-twitter-accent-sky200',
		border: 'border-twitter-accent-sky',
		name: 'sky'
	}
	private backgroundColorDefault: BackgroundColor = {
		background: 'bg-black',
		name: 'lights out'
	}

	constructor() {
		this.displaySettings = {
			themeColor: this.accentColorDefault,
			themeBackground: this.backgroundColorDefault
		}
		this.initializeDisplaySettings()
	}

	public get viewSettings(): DisplaySettings {
		return {...this.displaySettings}
	}

	public get themeColor(): AccentColor {
		const accentColor = this.displaySettings.themeColor;
		return {...accentColor}
	}

	public get themeBackground(): BackgroundColor {
		const bgColor = this.displaySettings.themeBackground;
		return {...bgColor}
	}

	setThemeColor(color: AccentColor) {
		this.displaySettings = { ...this.displaySettings, themeColor: color };
		this.updateSettingsInIndexedDB()
	}

	setThemeBackground(bgColor: BackgroundColor) {
		if (bgColor.name == 'lights out') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
		this.displaySettings = { ...this.displaySettings, themeBackground: bgColor };
		this.updateSettingsInIndexedDB()
	}

	private async initializeDisplaySettings() {
		try {
			await this.createDB();			

			const objectStore = this.DB.transaction(this.tableName).objectStore(this.tableName)

			// const results = objectStore.count()

			objectStore.openCursor().onsuccess = (e) => {
				const target = e.target as IDBRequest
				const cursor: IDBCursorWithValue = target.result
				if (!cursor) {
					this.saveSettingsInIndexedDB()
					return
				}
				const { themeColor, themeBackground } = cursor.value
				this.displaySettings = { ...this.displaySettings, themeColor, themeBackground }
				this.setThemeBackground(themeBackground)
			}

		} catch (error) {
			console.log(error);
		}
	}

	private updateSettingsInIndexedDB() {
		const transaction = this.DB.transaction([this.tableName], 'readwrite');

		const objectStore = transaction.objectStore(this.tableName)

		objectStore.put(this.displaySettings, this.keyDeviceSettings)

		transaction.oncomplete = () => {
			console.log('device settings updated successfully');
		}
	}

	private saveSettingsInIndexedDB() {
		const transaction = this.DB.transaction([this.tableName], 'readwrite');

		const objectStore = transaction.objectStore(this.tableName)

		objectStore.add(this.displaySettings, this.keyDeviceSettings)

		transaction.oncomplete = () => {
			console.log('device settings saved successfully');
		}
	}

	private async createDB() {
		const iDBReq = window.indexedDB.open(this.indexDBName, 1)
		iDBReq.onupgradeneeded = (e: IDBVersionChangeEvent) => {
			const target = e.target as IDBOpenDBRequest
			const db = target.result
			db.createObjectStore(this.tableName);
		}

		try {
			this.DB = await this.dbResult(iDBReq)
		} catch (error) {
			console.log(error);
		}
	}

	private dbResult(dbReq: IDBOpenDBRequest): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			dbReq.onsuccess = () => resolve(dbReq.result);
			dbReq.onerror = () => reject(dbReq.error);
		})
	}

}
