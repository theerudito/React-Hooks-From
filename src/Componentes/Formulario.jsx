import { useForm } from "react-hook-form";
import { EdadValidator } from "./Validator";

export const Formulario = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch
	} = useForm({
		defaultValues: { nombre: "Jorge" }
	});

	const onsubmit = (data) => {
		console.log(data);
	};

	const incluirTelefono = watch("incluirTelefono");

	return (
		<div>
			<h4>Formulario</h4>
			<form onSubmit={handleSubmit(onsubmit)}>
				<div>
					<p>Nombre: {watch("nombre")} </p>
					<label>Nombre: </label>
					<input
						type="text"
						{...register("nombre", {
							required: true,
							maxLength: 10
						})}
					/>
					{errors.nombre?.type === "required" && (
						<p style={{ color: "red" }}>Ingresar un nombre</p>
					)}
					{errors.nombre?.type === "maxLength" && (
						<p style={{ color: "red" }}>
							campo nombre debe tener maximo 10 caracteres
						</p>
					)}
				</div>
				<br />
				<div>
					<label>Email: </label>
					<input
						type="text"
						{...register("email", {
							required: true,
							pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
						})}
					/>

					{errors.email?.type === "pattern" && (
						<p style={{ color: "orange" }}>
							El Formato del Email es incorrecto
						</p>
					)}
				</div>
				<br />
				<div>
					<label>Direccion: </label>
					<input
						type="text"
						{...register("direccion", {
							required: true
						})}
					/>
				</div>
				<br />
				<div>
					<label>Edad: </label>
					<input
						type="number"
						{...register("edad", {
							required: true,
							validate: EdadValidator
						})}
					/>
					{errors.edad && (
						<p style={{ color: "greenyellow" }}>
							La edad debe Estar entre 18 y 65
						</p>
					)}
				</div>
				<br />
				<div>
					<label>Pais: </label>
					<select {...register("pais")}>
						<option value="es">ESPAÑA</option>
						<option value="ec">ECUADOR</option>
						<option value="fr">FRANCIA</option>
						<option value="usa">USA</option>
					</select>
				</div>
				<br />
				<div>
					<label>Incluir Telefono</label>
					<input type="checkbox" {...register("incluirTelefono")} />
				</div>
				{incluirTelefono && (
					<div>
						<label>Telefono: </label>
						<input type="text" {...register("telefono")} />
					</div>
				)}

				<br />
				<input type="submit" value="Enviar" />
			</form>
		</div>
	);
};
