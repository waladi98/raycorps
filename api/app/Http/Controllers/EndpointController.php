<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EndpointController extends Controller
{
    public function __construct()
    {
        //$this->client       = new \GuzzleHttp\Client();

        $this->client       = new \GuzzleHttp\Client(['verify' => false]);

        $this->base_url       ="https://api.yarsi.ac.id/core/";
        $this->secret_key     ="kpm_yarsi_2022";
    }

    public function endpoint_get(Request $request)
    {
        $obj        = $request->all();
        
        $id = base64_decode(urldecode($obj['_a']));
        
        $rawText = $this->cryptoJsAesDecrypt($this->secret_key, $id);

        $action_name="";
        $params="";
        $obj_name   = array_keys($rawText);

        foreach ($obj_name as $key => $value) {
            if($value != 'action'){
                if($params != ""){
                    $params.="&".$value."=".$rawText[$value];
                }else{
                    $params.="?".$value."=".$rawText[$value];
                }
            }else{
                $action_name=$rawText[$value];
            }
        }

        $response     = $this->client->get($this->base_url.$action_name.$params);

        $data=array(
            "_a"=>base64_encode(json_encode($this->CryptoJSAesEncrypt($this->secret_key,$response->getBody()->getContents())))
        );
        return $data;
    }

    public function endpoint_post(Request $request)
    {
        $obj        = $request->all();
        $id = base64_decode(urldecode($obj['_a']));
        
        $rawText = $this->cryptoJsAesDecrypt($this->secret_key, $id);

        $action_name="";
        $params=array();
        $obj_name   = array_keys($rawText);

        foreach ($obj_name as $key => $value) {
            if($value != 'action'){
                $params[$value]=$rawText[$value];
            }else{
                $action_name=$rawText[$value];
            }
        }

        $response     = $this->client->request('POST',$this->base_url.$action_name,['json'=>$params]);

        $data=array(
            "_a"=>base64_encode(json_encode($this->CryptoJSAesEncrypt($this->secret_key,$response->getBody()->getContents())))
        );
        return $data;
    }


    public function smart(Request $request)
    {

        $data=array(
            "kode"=>"ws_smart",
            "password"=>"aksesApi#67",
        );

        $response = $this->client->request('POST', $this->base_url.'klien/login',['json' => $data]);

        $data=array(
            "_a"=>base64_encode(json_encode($this->CryptoJSAesEncrypt($this->secret_key,$response->getBody()->getContents())))
        );
        return $data;

    }

    public function pmb(Request $request)
    {

        $data=array(
            "kode"=>"ws_pmb",
            "password"=>"abcdef",
        );

        $response = $this->client->request('POST', $this->base_url.'klien/login',['json' => $data]);

        $data=array(
            "_a"=>base64_encode(json_encode($this->CryptoJSAesEncrypt($this->secret_key,$response->getBody()->getContents())))
        );
        return $data;
    }

    public function feederTable(Request $request)
    {

        $data=
            array(
            "result"=>
            array(
                array(
                "jenis"=>2021,
                "situ"=>53,
                "feeder"=>0,
                "create"=>0,
                "update"=>0,
                "delete"=>0,
                "other"=>53
                ),
                array(
                "jenis"=>2020,
                "situ"=>51,
                "feeder"=>51,
                "create"=>0,
                "update"=>0,
                "delete"=>0,
                "other"=>0),
                array(
                "jenis"=>2019,
                "situ"=>48,
                "feeder"=>48,
                "create"=>0,
                "update"=>0,
                "delete"=>0,
                "other"=>0)
            ),
            "jumlah_data"=>20,
            "data_dikirim"=>5,
            "rekap_pengiriman"=>
            array(
                array(
                    "label"=>"Kinerja Semester Ini",
                    "number"=>15),
                array(
                    "label"=>"Kinerja 3 Tahun Terakhir",
                    "number"=>0),
                array(
                    "label"=>"Kinerja Seluruh Semester",
                    "number"=>0)
            ),
        );

        $data=array(
            "_a"=>base64_encode(json_encode($this->CryptoJSAesEncrypt($this->secret_key,json_encode($data))))
        );

        return $data;

    }


    public function feeder(Request $request)
    {

        $obj        = $request->all();
        $id = base64_decode(urldecode($obj['_a']));
        
        $rawText = $this->cryptoJsAesDecrypt($this->secret_key, $id);

        $action_name="";
        $params=array();
        $obj_name   = array_keys($rawText);

        foreach ($obj_name as $key => $value) {
            if($value != 'action'){
                $params[$value]=$rawText[$value];
            }else{
                $action_name=$rawText[$value];
            }
        }
        $gagal=5;

        $data=array(
            "kirim"=>$params["process"],
            "sukses"=>$params["process"]-$gagal,
            "gagal"=>$gagal,
        );

        $data=array(
            "_a"=>base64_encode(json_encode($this->CryptoJSAesEncrypt($this->secret_key,json_encode($data))))
        );

        sleep(5);

        return $data;

    }

    function CryptoJSAesEncrypt($passphrase, $plain_text){

        $salt = openssl_random_pseudo_bytes(256);
        $iv = openssl_random_pseudo_bytes(16);
     
        $iterations = 999;  
        $key = hash_pbkdf2("sha512", $passphrase, $salt, $iterations, 64);
    
        $encrypted_data = openssl_encrypt($plain_text, 'aes-256-cbc', hex2bin($key), OPENSSL_RAW_DATA, $iv);
    
        $data = array("_qiey" => base64_encode($encrypted_data), "_qeqs" => bin2hex($iv), "_qwy" => bin2hex($salt));
        return json_encode($data);
    }

    function cryptoJsAesDecrypt($passphrase, $jsonString){
        $jsondata = json_decode($jsonString, true);
        try {
            $salt = hex2bin($jsondata["s"]);
            $iv  = hex2bin($jsondata["iv"]);
        } catch(Exception $e) { return null; }
        $ct = base64_decode($jsondata["ct"]);
        $concatedPassphrase = $passphrase.$salt;
        $md5 = array();
        $md5[0] = md5($concatedPassphrase, true);
        $result = $md5[0];
        for ($i = 1; $i < 3; $i++) {
            $md5[$i] = md5($md5[$i - 1].$concatedPassphrase, true);
            $result .= $md5[$i];
        }
        $key = substr($result, 0, 32);
        $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
        return json_decode($data, true);
    }



    
}
