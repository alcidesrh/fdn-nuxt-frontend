import type { Mutation, Query } from "~/graphql/graphql";
import { Field as CustomField } from "~/graphql/parse/src";
import { useChangeCase } from "@vueuse/integrations/useChangeCase";

type props = {
	name: string;
	fields: Array<
		Record<
			"name" | "type" | "reference",
			string | null | Array<Record<"name" | "type", string>>
		>
	>;
};
type ApiResource = {
	MetadataResource: props;
	Agencia: props;
	User: props;
	Permiso: props;
	Localidad: props;
	Nacion: props;
	Asiento: props;
	Bus: props;
	Empresa: props;
	Piloto: props;
	Boleto: props;
	Cliente: props;
	BoletoLog: props;
	Salida: props;
	Recorrido: props;
	Parada: props;
	Enclave: props;
	SalidaLog: props;
	Estacion: props;
	FDN: props;
	Factura: props;
	Venta: props;
	Menu: props;
	Taxon: props;
	RecorridoAsientoPrecio: props;
	MultipleResource: props;
};
interface test {
	id: string;
	_id: number;
}

export const fdn = ref({
	resources: {} as ReadonlyArray<IntrospectionType>,
	queries: {} as Query[],
	mutations: {} as Mutation[],
	payload: {} as any[],
	input: {} as any[],
	isReady: computed(() => Object.keys(fdn.value.resources).length)
});

export class Entity<Type> {
	name: string;
	camelCase: string;
	fields: CustomField[];
	columns: CustomField[];
	item: Type & test;
	payload: {};
	input: {};
	excludeFields: string[];
	routes: Record<"list" | "create" | "edit", string>;
	endpoints: Record<"get" | "create" | "update" | "delete" | "form", string>;
	constructor(name: string, options: Record<string, any> = {}) {
		this.name = name;
		this.fields = fdn.value.resources[name].fields;
		this.excludeFields = [];
		this.columns = [];
		this.payload = this.input = {};
		["create", "update", "delete"].forEach(v => {
			const temp = `${v + name}Payload`,
				temp2 = `${v + name}Input`;
			this.payload[temp] = fdn.value.payload[temp];
			this.input[temp2] = fdn.value.input[temp2];
		});
		this.camelCase = useChangeCase(name, "camelCase").value;

		this.routes = {
			list: `${this.camelCase}_list`,
			create: `${this.camelCase}_create`,
			edit: `${this.camelCase}_edit`
		};
		const pascalCase = useChangeCase(name, "pascalCase").value;
		this.endpoints = { get: this.camelCase, form: "getFormResource" };
		["create", "update", "delete"].forEach(
			v => (this.endpoints[v] = v + pascalCase)
		);

		Object.keys(options).forEach(key => {
			this[key] = options[key];
		});
	}
	setColumns(fields: []) {
		this.columns = this.fields.filter(v => fields.includes(v.name));
	}
	getColumnsFields(): {}[] {
		const aux = this.columns.map((v: any) => Entity.prepareField(v));
		return [
			{ collection: ["_id", ...aux] },
			{
				paginationInfo: [
					"itemsPerPage",
					"lastPage",
					"totalCount",
					"hasNextPage"
				]
			}
		];
	}
	getQueryFields() {
		const fields = Object.keys(this.item);
		return this.fields
			.filter(
				v =>
					!this.excludeFields.includes(v.name) &&
					(!fields.length ||
						fields.includes(v.name) ||
						["id", "_id"].includes(v.name))
			)
			.map(v => Entity.prepareField(v));
	}
	getMutationFields() {
		const mutateInfo = fdn.value.mutations[this.getMutationOperation()];
		const root: any = {};
		root[
			fdn.value.payload[mutateInfo.type.name].fields.find(
				v => v.name != "clientMutationId"
			).name
		] = this.getQueryFields();

		return [root]; //root[fdn.value.payload[mutateInfo.type.name].fields.find((v) => v.name != 'clientMutationId').name];
	}
	getIriFromId(id): string {
		return `/api/${this.name.toLowerCase()}s/${id}`;
	}
	getMutationOperation(operation = null): string {
		const pascalCase = useChangeCase(this.name, "pascalCase").value;
		return this.item.id ? `update${pascalCase}` : `create${pascalCase}`;
	}
	static prepareField(v: any) {
		if (
			v.type.kind == "SCALAR" ||
			v.type.kind == "ENUM" ||
			(v?.type.kind == "NON_NULL" && v.type?.ofType?.kind == "SCALAR")
		) {
			return v.name;
		} else if (v.type.kind == "OBJECT" && v.type.name) {
			const temp = {};
			if (v.type.name.endsWith("PageConnection")) {
				const r = fdn.value.resources[v.type.name].fields.find(
					v => v.type.kind == "LIST"
				).type.ofType.name;
				temp[v.name] = [
					{
						collection: fdn.value.resources[r].fields
							.filter(v => ["id", "nombre"].includes(v.name))
							.map(v => v.name)
					}
				];
			} else if (v.type.name.endsWith("CursorConnection")) {
				const r = fdn.value.resources[v.type.name].fields.find(
					v => v.name == "edges"
				).type.ofType.name;
				const r2 = fdn.value.resources[r].fields.find(v => v.name == "node")
					.type.name;
				temp[v.name] = [
					{
						edges: [
							{
								node: fdn.value.resources[r2].fields
									.filter(v => ["id", "nombre"].includes(ofType.name))
									.map(v => v.name)
							}
						]
					}
				];
			} else {
				temp[v.name] = fdn.value.resources[v.type.name].fields
					.filter(v => !["OBJECT"].includes(v.type?.kind))
					.map(v => v.name);
			}
			return temp;
		} else if (v.type.kind == "LIST") {
			let temp = {};
			if (v.type.ofType.kind == "OBJECT") {
				temp[v.name] = fdn.value.resources[v.type.ofType.name].fields.map(
					v => v.name
				);
			}
			return temp;
		}
	}

	static prepareVariables(
		object: {},
		excludeValues: string[] = ["_id", "__typename"]
	) {
		if (typeof object == "string") {
			return !excludeValues.includes(object) ? object : null;
		}
		let newObject = {};
		Object.keys(object).forEach(key => {
			if (object[key]) {
				if (Array.isArray(object[key])) {
					const temp: {}[] = [];
					let temp2;
					object[key].forEach(v => {
						temp2 = Entity.prepareVariables(v);
						if (temp2) {
							temp.push(temp2);
						}
					});
					newObject[key] = temp;
				} else if (typeof object[key] === "object") {
					if (object[key].id) {
						newObject[key] = object[key].id;
					} else if (key == "group") {
						const group = object[key];
						Object.keys(group).forEach(key => {
							if (group[key]) {
								newObject[key] = Entity.prepareVariables(group[key]);
							}
						});
					} else {
						newObject[key] = Entity.prepareVariables(object[key]);
					}
				} else {
					if (!excludeValues.includes(key)) {
						newObject[key] = object[key];
					}
				}
			}
		});

		return newObject;
	}
}
