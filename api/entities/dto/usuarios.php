<?php
require_once('../../helpers/validator.php');
require_once('../../entities/dao/usuarios_queries.php');
/*
*	Clase para manejar la transferencia de datos de la entidad USUARIO.
*/
class Usuarios extends UsuariosQueries
{
    // Declaración de atributos (propiedades).
    public $id = null;
    public $usuario = null;
    public $clave = null;
    public $empleado = null;
    public $estado = null;

    //atributos xtra
    public $cargo = null;
    public $id_cargo = null;

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            return false;
        }
    }


    public function setUser($value)
    {
        if (Validator::validateAlphanumeric($value, 1, 50)) {
            $this->usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setClave($value)
    {
        if (Validator::validatePassword($value)) {
            $this->clave = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function setEmpleado($value)
    {
            $this->empleado = $value;
            return true;
    }

    public function setEstado($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->estado = $value;
            return true;
        } else {
            return false;
        }
    }

    //tipo empleado
    public function setTipo_empleado($value)
    {
        if (Validator::validateAlphanumeric($value, 1, 50)) {
            $this->cargo = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setId_cargo($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_cargo = $value;
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Métodos para obtener valores de los atributos.
    */
    public function getId()
    {
        return $this->id;
    }

    public function getUser()
    {
        return $this->usuario;
    }

    public function getClave()
    {
        return $this->clave;
    }

    
    public function getEmpleado()
    {
        return $this->empleado;
    }

    public function getEstado()
    {
        return $this->estado;
    }

    public function getTipo_empleado()
    {
        return $this->cargo;
    }

    public function getId_cargo()
    {
        return $this->id_cargo;
    }
}
?>