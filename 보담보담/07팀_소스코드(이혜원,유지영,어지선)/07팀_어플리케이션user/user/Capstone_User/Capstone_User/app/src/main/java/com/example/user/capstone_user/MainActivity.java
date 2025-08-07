package com.example.user.capstone_user;

import android.content.ContentValues;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class MainActivity extends AppCompatActivity {

    Button btnOpen, btnReceive, btnPw, btnAbn;
    TextView txtImpo,txtName;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnOpen = (Button) findViewById(R.id.Btn_Us_Open);
        btnPw = (Button) findViewById(R.id.Btn_Us_Pw);
        btnAbn = (Button) findViewById(R.id.Bt_Us_Abn);
        btnReceive = (Button) findViewById(R.id.Btn_Us_Receive);
        txtImpo = (TextView) findViewById(R.id.Txt_Us_Impo);
        txtName=(TextView)findViewById(R.id.Txt_Us_Name);

//        String url = "http://192.168.0.12/User_info.php";
        String url = "http://172.16.120.18/User_info.php";

        // AsyncTask를 통해 HttpURLConnection 수행.
        MainActivity.NetworkTask networkTask = new MainActivity.NetworkTask(url, null);
        networkTask.execute();


        btnOpen.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), Open_activity.class);
                startActivity(intent);
            }
        });

        btnPw.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), Pw_activity.class);
                startActivity(intent);
            }
        });
        btnReceive.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), Receive_activity.class);
                startActivity(intent);
            }
        });
        btnAbn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), Abn_activity.class);
                startActivity(intent);
            }
        });

    }
    public class NetworkTask extends AsyncTask<Void, Void, String> {

        private String url;
        private ContentValues values;

        public NetworkTask(String url, ContentValues values) {

            this.url = url;
            this.values = values;
        }

        @Override
        protected String doInBackground(Void... params) {

            String result; // 요청 결과를 저장할 변수.
            RequestHttpURLConnection requestHttpURLConnection = new RequestHttpURLConnection();
            result = requestHttpURLConnection.request(url, values); // 해당 URL로 부터 결과물을 얻어온다.

            return result;
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            try{
                String result="";
                String state1 ="0";
                String state2 ="1";

                JSONObject order=new JSONObject(s);
                JSONArray index=order.getJSONArray("webnautes");
                for (int i=0;i<index.length();i++) {
                    JSONObject tt = index.getJSONObject(i);
                    String name= tt.getString("stdId")+"님 사물함";
                    txtName.setText(name);
                    if (tt.getString("lckLock").equals(state1)){
                        result += "사물함 위치 : " + tt.getString("lckPlaceNot") + "\n"
                                + "현재 사물함은 열림 상태입니다.";
                    }
                    else if (tt.getString("lckLock").equals(state2)){
                        result += "사물함 위치 : " + tt.getString("lckPlaceNot") + "\n"
                                + "현재 사물함은 잠금 상태입니다.";
                    }
                    txtImpo.setText(result);

                }
            }catch (JSONException e){
                ;
            }
        }
        //doInBackground()로 부터 리턴된 값이 onPostExecute()의 매개변수로 넘어오므로 s를 출력한다.
    }
}

