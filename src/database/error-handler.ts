import {
	BadRequestException,
	NotFoundException,
	ConflictException,
	InternalServerErrorException,
	ServiceUnavailableException,
} from "../exceptions/http.exceptions";
import { type IErrorMessage } from "../interfaces/error-message.interface";

const handleMongoError = (error: any): never => {
	const errorMessage: IErrorMessage = {
		errorId: 1,
		message:
			error.code === 11000
				? "Bu kayıt zaten mevcut (duplicate key)."
				: "MongoDB hatası meydana geldi.",
		details: error.code !== 11000 ? error : undefined,
	};
	if (error.code === 11000) {
		throw new ConflictException(errorMessage);
	} else {
		throw new InternalServerErrorException(errorMessage);
	}
};

const errorHandlers: { [key: string]: (error: any) => never } = {
	ValidationError: (error) => {
		console.log(error);
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message: "Doğrulama hatası: Veriler geçersiz.",
			details: error.errors,
		};
		throw new BadRequestException(errorMessage);
	},
	CastError: (error) => {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message: `Dönüştürme hatası: ${error.path} alanı yanlış türde.`,
			details: error.reason,
		};
		throw new BadRequestException(errorMessage);
	},
	DocumentNotFoundError: (_error) => {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message: "İstenen belge bulunamadı.",
		};
		throw new NotFoundException(errorMessage);
	},
	ParallelSaveError: (_error) => {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message:
				"Paralel işlem hatası: Aynı belge üzerinde aynı anda birden fazla işlem yapılıyor.",
		};
		throw new ConflictException(errorMessage);
	},
	VersionError: (_error) => {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message: "Versiyon uyuşmazlığı.",
		};
		throw new ConflictException(errorMessage);
	},
	DivergentArrayError: (_error) => {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message:
				"Dizi alanı çakışması: Aynı anda farklı işlemler yapılıyor.",
		};
		throw new ConflictException(errorMessage);
	},
	SyncIndexesError: (error) => {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message: "Dizin senkronizasyon hatası.",
			details: error.errors,
		};
		throw new InternalServerErrorException(errorMessage);
	},
	MissingSchemaError: (_error) => {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message: "Şema eksik.",
		};
		throw new InternalServerErrorException(errorMessage);
	},
	ObjectExpectedError: (error) => {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message: `Beklenen obje hatası: ${error.path} alanı bir obje bekliyordu.`,
		};
		throw new BadRequestException(errorMessage);
	},
	ObjectParameterError: (_error) => {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message: "Geçersiz obje parametresi.",
		};
		throw new BadRequestException(errorMessage);
	},
	OverwriteModelError: (_error) => {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message: "Model zaten tanımlı.",
		};
		throw new InternalServerErrorException(errorMessage);
	},
	MongooseServerSelectionError: (_error) => {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message: "MongoDB sunucusuna bağlanılamadı.",
		};
		throw new ServiceUnavailableException(errorMessage);
	},
	StrictModeError: (error) => {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message: `Katı mod hatası: ${error.path} alanı şemada tanımlı değil.`,
		};
		throw new BadRequestException(errorMessage);
	},
	StrictPopulateError: (error) => {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message: `Katı populate hatası: ${error.path} alanı şemada tanımlı değil.`,
		};
		throw new BadRequestException(errorMessage);
	},
	MongoError: handleMongoError,
	MongoServerError: handleMongoError,
};

export default function handleMongooseError(error: any): never {
	const handler = errorHandlers[error.name];
	if (handler) {
		return handler(error);
	} else {
		const errorMessage: IErrorMessage = {
			errorId: 1,
			message: "Bilinmeyen bir hata meydana geldi.",
			details: error,
		};
		throw new InternalServerErrorException(errorMessage);
	}
}
